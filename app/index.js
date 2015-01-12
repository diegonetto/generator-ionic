'use strict';
var fs = require('fs');
var path = require('path');
var generators = require('yeoman-generator');
var _ = require('lodash');
var mout = require('mout');
var cordova = require('cordova');
var chalk = require('chalk');
var ionicUtils = require('../utils');

module.exports = generators.Base.extend({
  constructor: function () {
    generators.Base.apply(this, arguments);
    console.log(ionicUtils.greeting);

    this.argument('appName', { type: String, required: false });
    this.option('appName', { type: String, required: false });
    this.option('appId', { type: String, required: false });

  },

  prompting: {
    askForCompass: function askForCompass() {
      var done = this.async();

      this.prompt([{
        type: 'confirm',
        name: 'compass',
        message: 'Would you like to use Sass with Compass (requires Ruby)?',
        default: false
      }], function (props) {
        this.compass = props.compass;

        done();
      }.bind(this));
    },

    askForPlugins: function askForPlugins() {
      var done = this.async();

      this.prompt(ionicUtils.plugins.prompts, function (props) {
        this.plugins = props.plugins;

        done();
      }.bind(this));
    },

    askForStarter: function askForStarter() {
      var done = this.async();

      this.prompt([{
        type: 'list',
        name: 'starter',
        message: 'Which starter template [T] or example app [A] would you like to use?',
        choices: _.pluck(ionicUtils.starters.templates, 'name')
      }], function (props) {
        this.starter = _.find(ionicUtils.starters.templates, { name: props.starter });
        done();
      }.bind(this));
    }

  },

  configuring: {
    commonVariables: function() {
      this.appName = this.appName || this.options.appName || path.basename(process.cwd());
      this.appName = mout.string.pascalCase(this.appName);
      this.appId = this.options.appId || 'com.example.' + this.appName;
      this.appPath = 'app';
      this.root = process.cwd();

      this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
    },

    setupEnv: function setupEnv() {
      // Copies the contents of the generator example app
      // directory into your users new application path
      this.sourceRoot(path.join(__dirname, '../templates/'));
      this.directory('common/root', '.', true);
    },

    packageFiles: function packageFiles() {
      this.template('common/_bower.json', 'bower.json');
      this.template('common/_bowerrc', '.bowerrc');
      this.template('common/_package.json', 'package.json');
      this.template('common/Gruntfile.js', 'Gruntfile.js');
      this.template('common/_gitignore', '.gitignore');
    }
  },

  writing: {
    cordovaInit: function cordovaInit() {
      var done = this.async();
      cordova.create('.', this.appId, this.appName, function (error) {
        if (error) {
          console.log(chalk.yellow(error.message + ': Skipping `cordova create`'));
        } else {
          console.log(chalk.yellow('Created a new Cordova project with name "' + this.appName + '" and id "' + this.appId + '"'));
        }
        done();
      }.bind(this));
    },

    installPlugins: function installPlugins() {
      console.log(chalk.yellow('\nInstall plugins registered at plugins.cordova.io: ') + chalk.green('grunt plugin:add:org.apache.cordova.globalization'));
      console.log(chalk.yellow('Or install plugins direct from source: ') + chalk.green('grunt plugin:add:https://github.com/apache/cordova-plugin-console.git\n'));
      if (this.plugins.length > 0) {
        console.log(chalk.yellow('Installing selected Cordova plugins, please wait.'));
        // Turns out plugin() doesn't accept a callback so we try/catch instead
        try {
          cordova.plugin('add', this.plugins);
        } catch (e) {
          console.log(e);
          this.log.error(chalk.red('Please run `yo ionic` in an empty directory, or in that of an already existing cordova project.'));
          process.exit(1);
        }
      }
    },

    installStarter: function installStarter() {
      console.log(chalk.yellow('Installing starter template. Please wait'));
      var done = this.async();

      this.remote(this.starter.user, this.starter.repo, 'master', function (error, remote) {
        if (error) {
          done(error);
        }
        remote.directory('app', 'app');
        this.starterCache = path.join(this.cacheRoot(), this.starter.user, this.starter.repo, 'master');
        done();
      }.bind(this), true);
    },

    readIndex: function readIndex() {
      this.indexFile = this.engine(this.read(path.join(this.starterCache, 'index.html')), this);
    },

    appJs: function appJs() {
      var appPath = path.join(process.cwd(), 'app');
      var scriptPrefix = 'scripts' + path.sep;

      var scripts = [scriptPrefix + 'config.js'];
      this.fs.store.each(function (file, index) {
        if (file.path.indexOf('.js') !== -1)
        {
          var relPath = path.relative(appPath, file.path);
          if (relPath.indexOf(scriptPrefix) === 0) {
            scripts.push(relPath);
          }
        }
      });

      this.indexFile = this.appendScripts(this.indexFile, 'scripts/scripts.js', scripts);
    },

    createIndexHtml: function createIndexHtml() {
      this.indexFile = this.indexFile.replace(/&apos;/g, "'");
      this.write(path.join(this.appPath, 'index.html'), this.indexFile);
    },

    ensureStyles: function ensureStyles() {
      // Only create a main style file if the starter template didn't
      // have any styles. In the case it does, the starter should
      // supply both main.css and main.scss files, one of which
      // will be deleted
      
      var cssFile = 'main.' + (this.compass ? 'scss' : 'css');
      var unusedFile = 'main.' + (this.compass ? 'css' : 'scss');
      var stylePath = path.join(process.cwd(), 'app', 'styles');
      var found = false;

      this.fs.store.each(function (file, index) {
        if (path.dirname(file.path) === stylePath) {
          var name = path.basename(file.path);

          if (name === cssFile) {
            found = true;
          } else if (name === unusedFile) {
            // BUG: The log will still report the the file was created
            this.fs.delete(file.path);
          }
        }
      }.bind(this));

      if (!found) {
        this.copy('styles/' + cssFile, 'app/styles/' + cssFile);
      }

    },

    cordovaHooks: function cordovaHooks() {
      this.directory('hooks', 'hooks', true);
    },


    testFiles: function testFiles() {
      this.template('spec/controllers.js', 'test/spec/controllers.js');
    },

    packages: function () {
      this.installDependencies({ skipInstall: this.options['skip-install'] });
    }
  },

  end: {
    hookPerms: function hookPerms() {
      var iconsAndSplash = 'hooks/after_prepare/icons_and_splashscreens.js';
      fs.chmodSync(iconsAndSplash, '755');
    },
  }
});

