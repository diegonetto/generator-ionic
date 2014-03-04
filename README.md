![](http://i.imgur.com/BGrt2QK.png)

# Ionic Framework generator [![Build Status](https://api.travis-ci.org/diegonetto/generator-ionic.png?branch=master)](https://travis-ci.org/diegonetto/generator-ionic) [![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/)

> Yeoman generator for Ionic - lets you quickly set up a hybrid mobile app project

**This is currently under active development.**

## Usage
Install [Cordova CLI](http://cordova.apache.org/docs/en/3.0.0/guide_cli_index.md.html)
```
npm install -g cordova
```

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

## TODO
1. Building / Emulating doc section
2. Better starting app using SideBar and a few other components
3. Workflow doc section
4. SCSS / LESS support prompt options
5. Decide if we should use imagemin + svgmin
6. Add testing support using Karma and integrate with Grunt
7. Consider pulling in generator-angular as a subgenerator
8. Add Mocha generator unit tests
9. Contributing doc section

## Thanks
Special thanks to the [AngularJS Generator](https://github.com/yeoman/generator-angular) and [Ionic Seed Project](https://github.com/driftyco/ionic-angular-cordova-seed) projects for inspiration.

## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)
