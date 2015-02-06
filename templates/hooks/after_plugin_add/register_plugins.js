#!/usr/bin/env node

/**
 * Push plugins to cordovaPlugins array after_plugin_add
 */
var fs = require('fs');
var packageJSON = require('../../package.json');

packageJSON.cordovaPlugins = packageJSON.cordovaPlugins || [];

var fromEnv = process.env.CORDOVA_PLUGINS.split(',');
for (var i = 0; i < fromEnv.length; i++) {
	var plugin = fromEnv[i];

  if (packageJSON.cordovaPlugins.indexOf(plugin) !== -1) {
    packageJSON.cordovaPlugins.push(plugin);
  }
}

fs.writeFileSync('package.json', JSON.stringify(packageJSON, null, 2));
