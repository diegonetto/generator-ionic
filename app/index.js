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
    this.option('compass', { type: Boolean, required: false });
    this.option('starter', { type: String, required: false });
    this.option('templates', { type: Array, required: false });
    this.option('plugins', { type: Object, required: false });
    this.options.selected = {};
  },

  prompting: {
    askForCompass: function askForCompass() {
      var done = this.async();

      this.prompt([{
        type: 'confirm',
        name: 'compass',
        message: 'Would you like to use Sass with Compass (requires Ruby)?',
        default: (typeof(this.options.compass) !== 'undefined') ? this.options.compass : false
      }], function (props) {
        this.compass = this.options.selected.compass = props.compass;

        done();
      }.bind(this));
    },

    askForPlugins: function askForPlugins() {
      var done = this.async();

      if (this.options.plugins) {
        ionicUtils.mergePlugins(this.options.plugins);
      }

      this.prompt(ionicUtils.plugins.prompts, function (props) {
        this.plugins = this.options.selected.plugins = props.plugins;

        done();
      }.bind(this));
    },

    askForStarter: function askForStarter() {
      var done = this.async();

      if (this.options.templates) {
        ionicUtils.mergeStarterTemplates(this.options.templates);
      }

      var defaultIndex = 0;
      if (this.options.starter) {
        defaultIndex = _.findIndex(ionicUtils.starters.templates, { name: this.options.starter });

        if (defaultIndex === -1) {
          defaultIndex = 0;
          this.log(chalk.bgYellow(chalk.black('WARN')) +
            chalk.magenta(' Unable to locate the requested default template: ') +
            this.options.starter);
        }
      }

      this.prompt([{
        type: 'list',
        name: 'starter',
        message: 'Which starter template would you like to use?',
        choices: _.pluck(ionicUtils.starters.templates, 'name'),
        default: defaultIndex
      }], function (props) {
        this.starter = this.options.selected.starter = _.find(ionicUtils.starters.templates, { name: props.starter });
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
        // Removes thumbnail cache files
        var invisibleFiles = ['Thumbs.db', '.DS_Store'];
        invisibleFiles.forEach(function(filename) {
            var file = path.join(process.cwd(), filename)
            if(fs.existsSync(file) ) {
                fs.unlinkSync(file);
            }
       });
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

      var callback = function (error, remote) {
        if (error) {
          done(error);
        }

        // Template remote initialization: Copy from remote root folder (.) to working directory (/app)
        remote.directory('.', 'app');
 
        this.starterCache = remote.cachePath;
        done();
      }.bind(this);

      if (this.starter.path) {
        this.log(chalk.bgYellow(chalk.black('WARN')) +
          chalk.magenta(' Getting the template from a local path.  This should only be used for developing new templates.'));
        this.remoteDir(this.starter.path, callback);
      } else if (this.starter.url) {
        this.remote(this.starter.url, callback, true);
      } else {
        this.remote(this.starter.user, this.starter.repo, 'master', callback, true);
      }
    },

    readIndex: function readIndex() {
      this.indexFile = this.engine(this.read(path.join(this.starterCache, 'index.html')), this);
    },

    appJs: function appJs() {
      var appPath = path.join(process.cwd(), 'app');
      var scriptPrefix = 'js' + path.sep;

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

      //this.indexFile = this.appendScripts(this.indexFile, 'scripts/scripts.js', scripts);
    },

    createIndexHtml: function createIndexHtml() {
     
        // Regex: CSS
        this.indexFile = this.indexFile.replace(/lib\/ionic\/css/g,"bower_components\/ionic/release\/css");
        
        // Regex: Third party scripts (vendor.js)
        this.indexFile = this.indexFile.replace(/<script src="lib\/ionic\/js\/ionic.bundle.js"><\/script>/g, "<!-- build:js scripts\/vendor.js -->\n    <!-- bower:js -->\n    <!-- endbower -->\n    <!-- endbuild -->");
      
       // Regex: User script (scripts.js)
       this.indexFile = this.indexFile.replace(/<!-- your app's js -->/g,"<!-- your app's js -->\n    <!-- build:js scripts\/scripts.js -->");
       this.indexFile = this.indexFile.replace(/<\/head>/g,"  <!-- endbuild -->\n  <\/head>");
      
       // Regex for quotemarks
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
      var stylePath = path.join(process.cwd(), 'app', 'css');
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
        this.copy('styles/' + cssFile, 'app/css/' + cssFile);
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

