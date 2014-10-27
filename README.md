![](http://i.imgur.com/BGrt2QK.png)

## Ionic Framework generator [![Build Status](https://api.travis-ci.org/JaKXz/generator-ionic.png?branch=master)](https://travis-ci.org/JaKXz/generator-ionic) [![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/) [![Code Climate](https://codeclimate.com/github/JaKXz/generator-ionic/badges/gpa.svg)](https://codeclimate.com/github/JaKXz/generator-ionic)

**Note**: To run my version of the generator, you'll have to uninstall the original version and clone this repository and run `npm link`.

> Yeoman generator for creating Ionic hybrid mobile applications using AngularJS and Cordova - lets you quickly set up a project with sensible defaults and best practices.

## Features

- Scaffolding projects with Yeoman
- Integrated with the [ionic-cli](https://github.com/driftyco/ionic-cli)
- Browser LiveReload
- Emulator LiveReload
- Sass stylesheets compilation
- HTML, JavaScript and CSS obfuscation and minification
- Handles AngularJS dependency injection annotations
- Icons and Splashscreens support
- Cordova plugin management hooks
- Environment Specific Configuration for AngularJS
- Linting JavaScript
- Running unit tests
- Code coverage reporting with [istanbul](https://github.com/gotwarlost/istanbul)
- Bundled [ripple emulator](http://ripple.incubator.apache.org/)

## Usage
<!--Install `generator-ionic`
```
npm install -g generator-ionic
```-->

Make a new directory, and `cd` into it
```
mkdir my-ionic-project && cd $_
```

Run `yo ionic`, optionally passing an app name:
```
yo ionic [app-name]
```

Run `grunt` for building / compressing your Ionic app, `grunt serve` for a browser preview, and `grunt serve:compress` for a preview of the optimized application.

## Upgrading
Make sure you've committed (or backed up) your local changes and install the latest version of the generator via `npm install -g generator-ionic`, then go ahead and re-run `yo ionic` inside your project's directory.

The handsome devil is smart enough to figure out what files he is attempting to overwrite and prompts you to choose how you would like to proceed. Select `Y` for overwriting your `Gruntfile.js` and `bower.json` to stay up-to-date with the latest workflow goodies and front-end packages.

## Project Structure

Overview

    ├── Gruntfile.js            - Configuration of all Grunt tasks
    ├── package.json            - Dev dependencies and required Cordova plugins
    ├── bower.json              - Lists front-end dependencies
    ├── config.xml              - Global Cordova configuration
    ├── .gitignore              - Best practices for checking in Cordova apps
    ├── resources/              - Scaffolded placeholder Icons and Splashscreens
    │   ├── ios/
    │   ├── android/
    ├── app/
    │   ├── index.html          - Main Ionic app entry point
    │   ├── lib/                - Libraries managed by Bower
    │   ├── scripts/            - Custom AngularJS Scripts
    │   ├── styles/             - Stylesheets
    │   ├── templates/          - HTML views
    ├── platforms/              - Targeted operating systems
    ├── plugins/                - Native plugins
    ├── hooks/                  - Cordova lifecycle hooks
    ├── merges/                 - Platform specific overrides
    ├── coverage/               - Istanbul reports
    ├── test/                   - Unit tests
    │   ├── spec/
    ├── www/                    - Copied from app/ to be used by Cordova

## Workflow Commands

### `grunt serve[:compress]`

Run a local development server with built in filesystem watching support integrated with LiveReload so you can develop your Ionic app in a browser. Since this command uses the `ionic-cli` under the hood, you can specify any command line flags / options shown [here](https://github.com/driftyco/ionic-cli#testing-in-a-browser).

    $ grunt serve --consolelogs
    $ grunt serve:compress

### `grunt platform:add:<platform>`

Add a supported Cordova platform as a build target for this project.

    $ grunt platform:add:ios
    $ grunt platform:add:android

### `grunt plugin:add:<plugin>`

Install a native Cordova plugin either by [registry name](http://plugins.cordova.io/) or repository URL.

    $ grunt plugin:add:https://github.com/driftyco/ionic-plugins-keyboard.git
    $ grunt plugin:add:org.apache.cordova.device
    $ grunt plugin:add:org.apache.cordova.network-information

### `grunt [emulate|run]:<target>`

Either `emulate` your Ionic app inside a simulator or `run` it on a connected device, optionally enabling LiveReload support to supercharge your development speed and enhance productivity. __Note:__ Any changes to native plugins will still require a full rebuild. This command also uses the `ionic-cli` under the hood, so these [additional flags](https://github.com/driftyco/ionic-cli/blob/master/README.md#live-reload-app-during-development-beta) can be specified.

    $ grunt emulate:ios --livereload
    $ grunt emulate:ios --lc
    $ grunt emulate:ios --target=iPad -lc
    $ grunt emulate:android --consolelogs

    $ grunt run:ios
    $ grunt run:android

### `grunt compress`

Run your Ionic application files located in `app/` through the concatenation, obfuscation, and minification pipelines and write the optimized assets to the `www/` directory, which allows them to be consumed by either the `cordova` or `ionic` command line tools for packaging.

### `grunt serve:compress`

This runs `grunt compress` to optimize your Ionic app assets and then immediately launches a local development server so that you can preview the compressed application in a browser.

### `grunt build:<platform>`

Build your Ionic application for the targeted platform.

    $ grunt build:ios --device --release
    $ grunt build:android --debug

### `grunt jshint`

While running `grunt serve` or `grunt emulate`, the build system will be watching your filesystem for changes and linting your JavaScript files on the fly. However, you can invoke JSHint manually by using this command to spot check your Ionic app for linting errors.

### `grunt karma`

Launches the configured `karma` test running framework using PhantomJS.

### `grunt coverage`

Generates a static site containing code coverage reports for your unit tests using [Istanbul](http://gotwarlost.github.io/istanbul/).

### `grunt ripple`

Launch the bundled [Ripple](http://ripple.incubator.apache.org/) emulator by first adding a platform via `grunt platform:add:<platform>` and then running this command.

## Documentation

For a Getting Started guide, FAQ, and helpful tips, please see the [documentation](docs/README.md).

## License

[MIT License](http://opensource.org/licenses/mit-license.php)

[travis-image]: http://img.shields.io/travis/JaKXz/generator-ionic.svg?style=flat
[travis-url]: https://travis-ci.org/JaKXz/generator-ionic
