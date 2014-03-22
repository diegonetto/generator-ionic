'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var mout = require('mout');
var cordova = require('cordova');
var chalk = require('chalk');
var ionicUtils = require('../utils');

var IonicGenerator = module.exports = function IonicGenerator(args, options) {
  yeoman.generators.Base.apply(this, arguments);
  console.log(ionicUtils.greeting);

  this.argument('appName', { type: String, required: false });
  this.appName = this.appName || path.basename(process.cwd());
  this.appName = mout.string.pascalCase(this.appName);
  this.appId = 'com.example.' + this.appName;
  this.appPath = 'app';
  this.root = process.cwd();

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(IonicGenerator, yeoman.generators.Base);

IonicGenerator.prototype.askForCompass = function askForCompass() {
  var done = this.async();

  this.prompt([{
    type: 'confirm',
    name: 'compass',
    message: 'Would you like to use Sass (with Compass)?',
    default: true
  }], function (props) {
    this.compass = props.compass;

    done();
  }.bind(this));
};

IonicGenerator.prototype.cordovaInit = function cordovaInit() {
  var done = this.async();
  cordova.create('.', this.appId, this.appName, function (error) {
    if (error) {
      console.log(chalk.yellow(error.message + ': Skipping `cordova create`'));
    } else {
      console.log(chalk.yellow('Created a new Cordova project with name "' + this.appName + '" and id "' + this.appId + '"'));
    }
    done();
  }.bind(this));
};

IonicGenerator.prototype.askForPlugins = function askForPlugins() {
  var done = this.async();

  this.prompt(ionicUtils.plugins.prompts, function (props) {
    this.plugins = props.plugins;

    done();
  }.bind(this));
};

IonicGenerator.prototype.installPlugins = function installPlugins() {
  console.log(chalk.yellow('\nInstall plugins registered at plugins.cordova.io: ') + chalk.green('grunt plugin:add:org.apache.cordova.globalization'));
  console.log(chalk.yellow('Or install plugins direct from source: ') + chalk.green('grunt plugin:add:https://github.com/apache/cordova-plugin-console.git\n'));
  if (this.plugins.length > 0) {
    var done = this.async();
    console.log(chalk.yellow('Installing selected Cordova plugins, please wait.'));
    cordova.plugin('add', this.plugins, function (error) {
      if (error) {
        console.log(chalk.red(error.message));
      }
      done();
    });
  }
};

IonicGenerator.prototype.setupEnv = function setupEnv() {
  // Copies the contents of the generator example app
  // directory into your users new application path
  this.sourceRoot(path.join(__dirname, '../templates/'));
  this.directory('common/root', '.', true);
};

IonicGenerator.prototype.copyStyles = function copyStyles() {
  var sass = this.compass;
  var mainFile = 'main.' + (sass ? 'sass' : 'css');

  this.copy('styles/' + mainFile, 'app/styles/' + mainFile);
};

IonicGenerator.prototype.packageFiles = function packageFiles() {
  this.template('common/_bower.json', 'bower.json');
  this.template('common/_bowerrc', '.bowerrc');
  this.template('common/_package.json', 'package.json');
  this.template('common/Gruntfile.js', 'Gruntfile.js');
  this.template('common/_gitignore', '.gitignore');
};

IonicGenerator.prototype.appFiles = function appFiles() {
  this.template('javascript/app.js', 'app/scripts/app.js');
  this.template('javascript/controllers.js', 'app/scripts/controllers.js');
  this.template('javascript/services.js', 'app/scripts/services.js');
  this.template('views/index.html', 'app/index.html');
};

IonicGenerator.prototype.testFiles = function testFiles() {
  this.template('javascript/spec/controllers.js', 'test/spec/controllers.js');
};
