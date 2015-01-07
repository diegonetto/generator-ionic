#!/usr/bin/env node

/** This hook updates platform configuration files based on preferences and config-file data defined in config.xml.
    Currently only the AndroidManifest.xml and IOS *-Info.plist file are supported.

    Preferences:
    1.  Preferences defined outside of the platform element will apply to all platforms
    2.  Preferences defined inside a platform element will apply only to the specified platform
    3.  Platform preferences take precedence over common preferences
    4.  The preferenceMappingData object contains all of the possible custom preferences to date including the
        target file they belong to, parent element, and destination element or attribute

    Config Files
    1.  config-file elements MUST be defined inside a platform element, otherwise they will be ignored.
    2.  config-file target attributes specify the target file to update. (AndroidManifest.xml or *-Info.plist)
    3.  config-file parent attributes specify the parent element (AndroidManifest.xml) or parent key (*-Info.plist)
        that the child data will replace or be appended to.
    4.  config-file elements are uniquely indexed by target AND parent for each platform.
    5.  If there are multiple config-file's defined with the same target AND parent, the last config-file will be used
    6.  Elements defined WITHIN a config-file will replace or be appended to the same elements relative to the parent element
    7.  If a unique config-file contains multiples of the same elements (other than uses-permssion elements which are
        selected by by the uses-permission name attribute), the last defined element will be retrieved.

    Examples:

    AndroidManifest.xml
    NOTE: For possible manifest values see http://developer.android.com/guide/topics/manifest/manifest-intro.html

    <platform name="android">
        //These preferences are actually available in Cordova by default although not currently documented
        <preference name="android-minSdkVersion" value="8" />
        <preference name="android-maxSdkVersion" value="19" />
        <preference name="android-targetSdkVersion" value="19" />

        //custom preferences examples
        <preference name="android-windowSoftInputMode" value="stateVisible" />
        <preference name="android-installLocation" value="auto" />
        <preference name="android-launchMode" value="singleTop" />
        <preference name="android-activity-hardwareAccelerated" value="false" />
        <preference name="android-manifest-hardwareAccelerated" value="false" />
        <preference name="android-configChanges" value="orientation" />
        <preference name="android-theme" value="@android:style/Theme.Black.NoTitleBar" />

        <config-file target="AndroidManifest.xml" parent="/*>
            <supports-screens
                android:xlargeScreens="false"
                android:largeScreens="false"
                android:smallScreens="false" />

            <uses-permission android:name="android.permission.READ_CONTACTS" android:maxSdkVersion="15" />
            <uses-permission android:name="android.permission.WRITE_CONTACTS" />
        </config-file>
    </platform>

    *-Info.plist

    <platform name="ios">
        <config-file platform="ios" target="*-Info.plist" parent="UISupportedInterfaceOrientations">
            <array>
                <string>UIInterfaceOrientationLandscapeOmg</string>
            </array>
        </config-file>

        <config-file platform="ios" target="*-Info.plist" parent="SomeOtherPlistKey">
            <string>someValue</string>
        </config-file>
    </platform>

    NOTE: Currently, items aren't removed from the platform config files if you remove them from config.xml.
          For example, if you add a custom permission, build the remove it, it will still be in the manifest.
          If you make a mistake, for example adding an element to the wrong parent, you may need to remove and add your platform,
          or revert to your previous manifest/plist file.

    TODO: We may need to capture all default manifest/plist elements/keys created by Cordova along with any plugin elements/keys to compare against custom elements to remove.
 */

// global vars
var fs = require('fs');
var path = require('path');
var _ = require('lodash');
var et = require('elementtree');
var plist = require('plist');

var rootdir = path.resolve(__dirname, '../../');

var platformConfig = (function(){
    /*  Global object that defines the available custom preferences for each platform.
     Maps a config.xml preference to a specific target file, parent element, and destination attribute or element
     */
    var preferenceMappingData = {
        'android': {
            'android-manifest-hardwareAccelerated': {target: 'AndroidManifest.xml', parent: './', destination: 'android:hardwareAccelerated'},
            'android-installLocation': {target: 'AndroidManifest.xml', parent: './', destination: 'android:installLocation'},
            'android-activity-hardwareAccelerated': {target: 'AndroidManifest.xml', parent: 'application', destination: 'android:hardwareAccelerated'},
            'android-configChanges': {target: 'AndroidManifest.xml', parent: 'application/activity[@android:name=\'CordovaApp\']', destination: 'android:configChanges'},
            'android-launchMode': {target: 'AndroidManifest.xml', parent: 'application/activity[@android:name=\'CordovaApp\']', destination: 'android:launchMode'},
            'android-theme': {target: 'AndroidManifest.xml', parent: 'application/activity[@android:name=\'CordovaApp\']', destination: 'android:theme'},
            'android-windowSoftInputMode': {target: 'AndroidManifest.xml', parent: 'application/activity[@android:name=\'CordovaApp\']', destination: 'android:windowSoftInputMode'}
        },
        'ios': {}
    };
    var configXmlData, preferencesData;

    return {
        // Parses a given file into an elementtree object
        parseElementtreeSync: function (filename) {
            var contents = fs.readFileSync(filename, 'utf-8');
            if(contents) {
                //Windows is the BOM. Skip the Byte Order Mark.
                contents = contents.substring(contents.indexOf('<'));
            }
            return new et.ElementTree(et.XML(contents));
        },

        // Converts an elementtree object to an xml string.  Since this is used for plist values, we don't care about attributes
        eltreeToXmlString: function (data) {
            var tag = data.tag;
            var el = '<' + tag + '>';

            if(data.text && data.text.trim()) {
                el += data.text.trim();
            } else {
                _.each(data.getchildren(), function (child) {
                    el += platformConfig.eltreeToXmlString(child);
                });
            }

            el += '</' + tag + '>';
            return el;
        },

        // Parses the config.xml into an elementtree object and stores in the config object
        getConfigXml: function () {
            if(!configXmlData) {
                configXmlData = this.parseElementtreeSync(path.join(rootdir, 'config.xml'));
            }

            return configXmlData;
        },

        /* Retrieves all <preferences ..> from config.xml and returns a map of preferences with platform as the key.
           If a platform is supplied, common prefs + platform prefs will be returned, otherwise just common prefs are returned.
         */
        getPreferences: function (platform) {
            var configXml = this.getConfigXml();

            //init common config.xml prefs if we haven't already
            if(!preferencesData) {
                preferencesData = {
                    common: configXml.findall('preference')
                };
            }

            var prefs = preferencesData.common || [];
            if(platform) {
                if(!preferencesData[platform]) {
                    preferencesData[platform] = configXml.findall('platform[@name=\'' + platform + '\']/preference');
                }
                prefs = prefs.concat(preferencesData[platform]);
            }

            return prefs;
        },

        /* Retrieves all configured xml for a specific platform/target/parent element nested inside a platforms config-file
           element within the config.xml.  The config-file elements are then indexed by target|parent so if there are
           any config-file elements per platform that have the same target and parent, the last config-file element is used.
         */
        getConfigFilesByTargetAndParent: function (platform) {
            var configFileData = this.getConfigXml().findall('platform[@name=\'' + platform + '\']/config-file');

            return  _.indexBy(configFileData, function(item) {
                var parent = item.attrib.parent;
                //if parent attribute is undefined /* or */, set parent to top level elementree selector
                if(!parent || parent === '/*' || parent === '*/') {
                    parent = './';
                }
                return item.attrib.target + '|' + parent;
            });
        },

        // Parses the config.xml's preferences and config-file elements for a given platform
        parseConfigXml: function (platform) {
            var configData = {};
            this.parsePreferences(configData, platform);
            this.parseConfigFiles(configData, platform);

            return configData;
        },

        // Retrieves the config.xml's pereferences for a given platform and parses them into JSON data
        parsePreferences: function (configData, platform) {
            var preferences = this.getPreferences(platform),
                type = 'preference';

            _.each(preferences, function (preference) {
                var prefMappingData = preferenceMappingData[platform][preference.attrib.name],
                    target,
                    prefData;

                if (prefMappingData) {
                    prefData = {
                        parent: prefMappingData.parent,
                        type: type,
                        destination: prefMappingData.destination,
                        data: preference
                    };

                    target = prefMappingData.target;
                    if(!configData[target]) {
                        configData[target] = [];
                    }
                    configData[target].push(prefData);
                }
            });
        },

        // Retrieves the config.xml's config-file elements for a given platform and parses them into JSON data
        parseConfigFiles: function (configData, platform) {
            var configFiles = this.getConfigFilesByTargetAndParent(platform),
                type = 'configFile';

            _.each(configFiles, function (configFile, key) {
                var keyParts = key.split('|');
                var target = keyParts[0];
                var parent = keyParts[1];
                var items = configData[target] || [];

                _.each(configFile.getchildren(), function (element) {
                    items.push({
                        parent: parent,
                        type: type,
                        destination: element.tag,
                        data: element
                    });
                });

                configData[target] = items;
            });
        },

        // Parses config.xml data, and update each target file for a specified platform
        updatePlatformConfig: function (platform) {
            var configData = this.parseConfigXml(platform),
                platformPath = path.join(rootdir, 'platforms', platform);

            _.each(configData, function (configItems, targetFileName) {
                var projectName, targetFile;

                if (platform === 'ios' && targetFileName.indexOf("Info.plist") > -1) {
                    projectName = platformConfig.getConfigXml().findtext('name');
                    targetFile = path.join(platformPath, projectName, projectName + '-Info.plist');
                    platformConfig.updateIosPlist(targetFile, configItems);
                } else if (platform === 'android' && targetFileName === 'AndroidManifest.xml') {
                    targetFile = path.join(platformPath, targetFileName);
                    platformConfig.updateAndroidManifest(targetFile, configItems);
                }
            });
        },

        // Updates the AndroidManifest.xml target file with data from config.xml
        updateAndroidManifest: function (targetFile, configItems) {
            var tempManifest = platformConfig.parseElementtreeSync(targetFile),
                root = tempManifest.getroot();

            _.each(configItems, function (item) {
                // if parent is not found on the root, child/grandchild nodes are searched
                var parentEl = root.find(item.parent) || root.find('*/' + item.parent),
                    data = item.data,
                    childSelector = item.destination,
                    childEl;

                if(!parentEl) {
                    return;
                }

                if(item.type === 'preference') {
                    parentEl.attrib[childSelector] = data.attrib['value'];
                } else {
                    // since there can be multiple uses-permission elements, we need to select them by unique name
                    if(childSelector === 'uses-permission') {
                        childSelector += '[@android:name=\'' + data.attrib['android:name'] + '\']';
                    }

                    childEl = parentEl.find(childSelector);
                    // if child element doesnt exist, create new element
                    if(!childEl) {
                        childEl = new et.Element(item.destination);
                        parentEl.append(childEl);
                    }

                    // copy all config.xml data except for the generated _id property
                    _.each(data, function (prop, propName) {
                        if(propName !== '_id') {
                            childEl[propName] = prop;
                        }
                    });
                }
            });

            fs.writeFileSync(targetFile, tempManifest.write({indent: 4}), 'utf-8');
        },

        /* Updates the *-Info.plist file with data from config.xml by parsing to an xml string, then using the plist
           module to convert the data to a map.  The config.xml data is then replaced or appended to the original plist file
         */
        updateIosPlist: function (targetFile, configItems) {
            var infoPlist = plist.parse(fs.readFileSync(targetFile, 'utf-8')),
                tempInfoPlist;

            _.each(configItems, function (item) {
                var key = item.parent;
                var plistXml = '<plist><dict><key>' + key + '</key>';
                plistXml += platformConfig.eltreeToXmlString(item.data) + '</dict></plist>';

                var configPlistObj = plist.parse(plistXml);
                infoPlist[key] = configPlistObj[key];
            });

            tempInfoPlist = plist.build(infoPlist);
            tempInfoPlist = tempInfoPlist.replace(/<string>[\s\r\n]*<\/string>/g,'<string></string>');
            fs.writeFileSync(targetFile, tempInfoPlist, 'utf-8');
        }
    };
})();

// Main
(function () {
    if (rootdir) {
        // go through each of the platform directories that have been prepared
        var platforms = _.filter(fs.readdirSync('platforms'), function (file) {
            return fs.statSync(path.resolve('platforms', file)).isDirectory();
        });

        _.each(platforms, function (platform) {
            try {
                platform = platform.trim().toLowerCase();
                platformConfig.updatePlatformConfig(platform);
            } catch (e) {
                process.stdout.write(e);
            }
        });
    }
})();