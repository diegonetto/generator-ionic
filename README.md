![](http://i.imgur.com/BGrt2QK.png)

## Ionic Framework generator [![Build Status](https://api.travis-ci.org/diegonetto/generator-ionic.png?branch=master)](https://travis-ci.org/diegonetto/generator-ionic) [![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/)

> Yeoman generator for Ionic - lets you quickly set up a hybrid mobile app project

**This is currently under active development.**

## Usage
Install `generator-ionicjs`
```
npm install -g generator-ionicjs
```

Make a new directory, and `cd` into it
```
mkdir my-ionic-project && cd $_
```

Run `yo ionicjs`
```
yo ionicjs
```

Spin up a `connect` server with `watch` and `livereload` for developing in your browser
```
grunt serve
```
## Workflow
The included Grunt build system provides sensible defaults to help optimize and automate several aspects of your workflow when developing hybrid-mobile apps using the Ionic Framework.

### Local browser development
Running `grunt serve` enhances your workflow by allowing you to rapidly build Ionic apps without having to constantly re-run your platform simulator. Since we spin up a `connect` server with `watch` and `livereload` tasks, you can freely edit your CSS (or SCSS/SASS files if you chose to use Compass), HTML, and JavaScript files and changes will be quickly reflected in your browser.

### Building assets for Cordova
Once you're ready to test your application in a simulator, `grunt build` will concatenate, obfuscate, and minify your JavaScript, HTML, and CSS files and copy over the resulting assets into your app's `www/` directory so they are ready to be served by Cordova.

### Cordova commands
To make our lives a bit simpler, the `cordova` library has been packaged as a part of this generator and delegated via Grunt tasks. To invoke Cordova, simply run the command you would normally have, but replace `cordova` with `grunt` and `spaces` with `:` (the way grunt chains task arguments).

For example, lets say you want to add iOS as a platform target for your Ionic app
```
grunt platform:add:ios
```
or emulate a platform target
```
grunt emulate:ios
```

## Putting it all together
Let's walk through an example workflow. We're assuming you've followed the [usage](https://github.com/diegonetto/generator-ionic#usage) directions and are inside your app's directory.

We'll start by running our app in a browser so we can make a few changes.
```
grunt serve
```
Play around with livereload by changing some of the styles in `app/styles/main.css` or HTML in one of the files in `app/templates/`. When you're ready, lets go ahead and build the assets for Cordova to consume and also spot check that we didn't bork any code during the build process. We can do that with another handy grunt task that runs the build process and then launches a `connect` server for use to preview the app with our built assets.
```
grunt serve:dist
```
If everything looks good the next step is to add a platform target and then emulate our app. In order for us to launch the iOS simulator from the command line, we'll have to install the `ios-sim` package. (If you forget to do this, Cordova will kindly remind you).
```
npm install -g ios-sim
grunt platform:add:ios
grunt emulate:ios
```
You may have realized that when the Grunt build process is run, it also triggers the Cordova build system as well, so you end up with a beautifully packaged mobile app in a single command.

Congratulations - You're now up and running with the gorgeous Ionic Framework powered by an intelligent workflow and sophisticated build system!

## TODO
1. ~~building / Emulating doc section~~
2. Better starting app using SideBar and a few other components
3. ~~Workflow doc section~~
4. ~~SCSS prompt options~~
5. Decide if we should use imagemin + svgmin
6. Add testing support using Karma and integrate with Grunt
7. Consider pulling in generator-angular as a subgenerator
8. Add Mocha generator unit tests
9. Contributing doc section

## Special Thanks To
* The pioneers behind [Yeoman](http://yeoman.io/) for building an intelligent workflow managemnt solution.
* The [AngularJS Generator](https://github.com/yeoman/generator-angular) and [Ionic Seed Project](https://github.com/driftyco/ionic-angular-cordova-seed) projects for inspiration.
* The visionaries at [Drifty](http://drifty.com) for creating the [Ionic Framework](http://ionicframework.com/).

## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)
