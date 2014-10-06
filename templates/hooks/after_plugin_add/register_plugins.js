#!/usr/bin/env node

/**
 * Push plugins to cordovaPlugins array after_plugin_add
 */
var fs = require('fs');
var _ = require('lodash');
var packageJSON = require('../../package.json');

packageJSON.cordovaPlugins = packageJSON.cordovaPlugins || [];
_.each(process.env.CORDOVA_PLUGINS.split(','), function (plugin) {
  if (! _.contains(packageJSON.cordovaPlugins, plugin)) {
    packageJSON.cordovaPlugins.push(plugin);
  }
});

fs.writeFileSync('package.json', JSON.stringify(packageJSON, null, 2));
