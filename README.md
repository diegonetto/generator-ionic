![](http://i.imgur.com/Cedw75X.png)

# Ionic Framework generator

> Yeoman generator for Ionic - lets you quickly set up a hybrid mobile app project

**This is currently under active development.**

## Usage
Install [Cordova CLI](http://cordova.apache.org/docs/en/3.0.0/guide_cli_index.md.html)
```
npm install -g cordova
```

Install `generator-ionic`:
```
npm install -g generator-ionic
```

Make a new directory, and `cd` into it:
```
mkdir my-ionic-project && cd $_
```

Run `yo ionic`
```
yo ionic
```

Spin up a `connect` server with `watch` and `livereload` for developing in a browser
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
Special thanks to the following projects for inspiration:
1. [AngularJS Generator](https://github.com/yeoman/generator-angular)
2. [Ionic Seed Project](https://github.com/driftyco/ionic-angular-cordova-seed)

## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)
