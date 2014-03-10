'use strict';
var util = require('util');
var fs = require('fs');
var path = require('path');
var yeoman = require('yeoman-generator');
var mout = require('mout').string;
var cordova = require('cordova');
var chalk = require('chalk');
var xml2js = require('xml2js');
var common = require('../lib/common');  

var IonicGenerator = module.exports = function IonicGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.argument('appName', { type: String, required: false });
  this.appName = this.appName || path.basename(process.cwd());
  this.appName = mout.pascalCase(this.appName);
  this.appId = 'com.example.' + this.appName;
  this.appPath = 'app';
  this.root = process.cwd();

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(IonicGenerator, yeoman.generators.Base);

IonicGenerator.prototype.init = function init() {
  console.log(common.ionic);
  cordova.create('.', this.appId, this.appName);
  console.log(chalk.yellow('Creating a new cordova project with name "' + this.appName + '" and id "' + this.appId + '"'));
};

IonicGenerator.prototype.askForCompass = function askForCompass() {
  var done = this.async();

  this.prompt([{
    type: 'confirm',
    name: 'compass',
    message: "Would you like to use Sass (with Compass)?",
    default: true
  }], function(props) {
    this.compass = props.compass;

    done();
  }.bind(this));
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

// TODO: See if these options that the ionic seed project set config.xml are really needed
/*IonicGenerator.prototype.updateCordovaConfig = function updateCordovaConfig() {
  console.log(chalk.yellow('Attemping to overwrite Cordova generated files with example app skeleton.'));
  console.log(chalk.yellow('Type "y" and hit Enter to confirm overwrites:'));
  var parser = new xml2js.Parser({ normalize: true });
  var builder = new xml2js.Builder();
  var configPath = path.join(this.root, 'config.xml');
  var done = this.async();

  fs.readFile(configPath, function(err, data) {
    parser.parseString(data, function(err, config) {
      config.widget.preference = [
        { '$': { name: 'fullscreen', value: 'true' } },
        { '$': { name: 'webviewbounce', value: 'false' } },
        { '$': { name: 'UIWebViewBounce', value: 'false' } },
        { '$': { name: 'DisallowOverscroll', value: 'true' } }
      ];
      this.write(configPath, builder.buildObject(config));
      done();
    }.bind(this));
  }.bind(this));
};*/


