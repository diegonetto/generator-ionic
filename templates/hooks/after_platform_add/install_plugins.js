#!/usr/bin/env node

/**
 * Install all plugins listed in package.json
 */
var exec = require('child_process').exec;
var path = require('path');
var sys = require('sys');

var packageJSON = require('../../package.json');
var cmd = process.platform === 'win32' ? 'cordova.cmd' : 'cordova';
var script = path.resolve(__dirname, '../../node_modules/cordova/bin', cmd);

packageJSON.cordovaPlugins = packageJSON.cordovaPlugins || [];
packageJSON.cordovaPlugins.forEach(function (plugin) {
  exec(script + ' plugin add ' + plugin, function (error, stdout, stderr) {
    sys.puts(stdout);
  });
});
