#!/usr/bin/env node

/**
 * Install all plugins listed in package.json
 */
var execSync = require('child_process').execSync;
var path = require('path');
var sys = require('sys');

var packageJSON = require('../../package.json');
var cmd = process.platform === 'win32' ? 'cordova.cmd' : 'cordova';
var script = path.resolve(__dirname, '../../node_modules/cordova/bin', cmd);

packageJSON.cordovaPlugins = packageJSON.cordovaPlugins || [];
packageJSON.cordovaPlugins.forEach(function (plugin) {

	// If the found element is not a string, ignore it.
	if(typeof(plugin) != "string"){return;}

	// Write "Installing plugin..." but without the new line
	process.stdout.write("Installing plugin " + plugin + "...");

	var err = false;
	try {
		execSync(script + ' plugin add ' + plugin).toString('utf8');
	}catch(errdata){
		err = errdata;
	}
	
	if(!err){
		console.log("OK");
	}else{
		console.log("ERROR");
		console.error(err);
	}

});
