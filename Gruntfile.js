// Generated on 2014-08-05 using generator-ionic 0.4.1
'use strict';

var _ = require('lodash');
var path = require('path');
var cordova = require('cordova');
var spawn = require('child_process').spawn;




module.exports = function (grunt) {

  // Load grunt tasks automatically
  grunt.loadNpmTasks('grunt-gulp');
  require('load-grunt-tasks')(grunt);



  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Define the configuration for all the tasks
  grunt.initConfig({

    // Project settings
    yeoman: {
      // configurable paths
      app: 'app',
      scripts: 'scripts',
      styles: 'styles',
      images: 'images',
      test: 'test',
      temp: '.temp',
      dist: 'www'
    },

    // Environment Variables for Angular App
    // This creates an Angular Module that can be injected using via ENV
    // Add any desired constants to the ENV objects below.
    ngconstant: {
      options: {
        space: '  ',
        wrap: '"use strict";\n\n {%= __ngModule %}',
        name: 'config',
        dest: '<%= yeoman.app %>/<%= yeoman.scripts %>/configuration.js'
      },
      development: {
        constants: {
          ENV: {
            name: 'development',
            apiEndpoint: 'http://dev.yoursite.com:10000/'
          }
        }
      },
      production: {
        constants: {
          ENV: {
            name: 'production',
            apiEndpoint: 'http://api.yoursite.com/'
          }
        }
      }
    },

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      js: {
        files: ['<%= yeoman.app %>/<%= yeoman.scripts %>/**/*.js'],
        tasks: ['newer:jshint:all'],
        options: {
          livereload: true
        }
      },
      compass: {
        files: ['<%= yeoman.app %>/<%= yeoman.styles %>/**/*.{scss,sass}'],
        tasks: ['compass:server', 'autoprefixer']
      },
      gruntfile: {
        files: ['Gruntfile.js'],
        tasks: ['ngconstant:development']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= yeoman.app %>/*.html',
          '<%= yeoman.app %>/templates/**/*.html',
          '<%= yeoman.temp %>/<%= yeoman.styles %>/**/*.css',
          '<%= yeoman.app %>/<%= yeoman.images %>/**/*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    },

    gulp: {
      options: {
        tasks: function(stream) {return stream.pipe(require('gulp-sass')());},
      },
      '<%= yeoman.app %>/bower_components/ionic/release/css/ionic.css':['<%= yeoman.app %>/bower_components/ionic/scss/ionic.scss'],
    },

    // The actual grunt server settings
    connect: {
      options: {
        port: 9000,
        // Change this to '0.0.0.0' to access the server from outside.
        hostname: 'localhost',
        livereload: 35729
      },
      livereload: {
        options: {
          open: true,
          base: [
            '<%= yeoman.temp %>',
            '<%= yeoman.app %>'
          ]
        }
      },
      dist: {
        options: {
          base: '<%= yeoman.dist %>'
        }
      },
      coverage: {
        options: {
          port: 9002,
          open: true,
          base: ['coverage']
        }
      }
    },

    // Make sure code styles are up to par and there are no obvious mistakes
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: [
        'Gruntfile.js',
        '<%= yeoman.app %>/<%= yeoman.scripts %>/**/*.js'
      ],
      test: {
        options: {
          jshintrc: '<%= yeoman.test %>/.jshintrc'
        },
        src: ['<%= yeoman.test %>/unit/**/*.js']
      }
    },

    // Empties folders to start fresh
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '<%= yeoman.temp %>',
            '<%= yeoman.dist %>/*',
            '!<%= yeoman.dist %>/.git*'
          ]
        }]
      },
      server: '<%= yeoman.temp %>'
    },

    autoprefixer: {
      options: {
        browsers: ['last 1 version']
      },
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.temp %>/<%= yeoman.styles %>/',
          src: '{,*/}*.css',
          dest: '<%= yeoman.temp %>/<%= yeoman.styles %>/'
        }]
      }
    },

    // Automatically inject Bower components into the app
    'bower-install': {
      app: {
        html: '<%= yeoman.app %>/index.html',
        ignorePath: '<%= yeoman.app %>/'
      }
    },

    
    // Compiles Sass to CSS and generates necessary files if requested
    compass: {
      options: {
        sassDir: '<%= yeoman.app %>/<%= yeoman.styles %>',
        cssDir: '<%= yeoman.temp %>/<%= yeoman.styles %>',
        generatedImagesDir: '<%= yeoman.temp %>/<%= yeoman.images %>/generated',
        imagesDir: '<%= yeoman.app %>/<%= yeoman.images %>',
        javascriptsDir: '<%= yeoman.app %>/<%= yeoman.scripts %>',
        fontsDir: '<%= yeoman.app %>/<%= yeoman.styles %>/fonts',
        importPath: '<%= yeoman.app %>/bower_components',
        httpImagesPath: '/<%= yeoman.images %>',
        httpGeneratedImagesPath: '/<%= yeoman.images %>/generated',
        httpFontsPath: '/<%= yeoman.styles %>/fonts',
        relativeAssets: false,
        assetCacheBuster: false,
        raw: 'Sass::Script::Number.precision = 10\n'
      },
      dist: {
        options: {
          generatedImagesDir: '<%= yeoman.dist %>/<%= yeoman.images %>/generated'
        }
      },
      server: {
        options: {
          debugInfo: true
        }
      }
    },
    

    // Reads HTML for usemin blocks to enable smart builds that automatically
    // concat, minify and revision files. Creates configurations in memory so
    // additional tasks can operate on them
    useminPrepare: {
      html: '<%= yeoman.app %>/index.html',
      options: {
        dest: '<%= yeoman.dist %>',
        flow: {
          html: {
            steps: {
              js: ['concat', 'uglifyjs'],
              css: ['cssmin']
            },
            post: {}
          }
        }
      }
    },

    // Performs rewrites based on the useminPrepare configuration
    usemin: {
      html: ['<%= yeoman.dist %>/**/*.html'],
      css: ['<%= yeoman.dist %>/<%= yeoman.styles %>/**/*.css'],
      options: {
        assetsDirs: ['<%= yeoman.dist %>']
      }
    },

    // The following *-min tasks produce minified files in the dist folder
    cssmin: {
      options: {
        root: '<%= yeoman.app %>',
        noRebase: true
      }
    },
    htmlmin: {
      dist: {
        options: {
          collapseWhitespace: true,
          collapseBooleanAttributes: true,
          removeCommentsFromCDATA: true,
          removeOptionalTags: true
        },
        files: [{
          expand: true,
          cwd: '<%= yeoman.dist %>',
          src: ['*.html', 'templates/**/*.html'],
          dest: '<%= yeoman.dist %>'
        }]
      }
    },

    // Copies remaining files to places other tasks can use
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= yeoman.app %>',
          dest: '<%= yeoman.dist %>',
          src: [
            '<%= yeoman.images %>/**/*.{png,jpg,jpeg,gif,webp,svg}',
            '*.html',
            'templates/**/*.html',
            'fonts/*',
            'res/**'
          ]
        }, {
          expand: true,
          cwd: '<%= yeoman.temp %>/<%= yeoman.images %>',
          dest: '<%= yeoman.dist %>/<%= yeoman.images %>',
          src: ['generated/*']
        }]
      },
      styles: {
        expand: true,
        cwd: '<%= yeoman.app %>/<%= yeoman.styles %>',
        dest: '<%= yeoman.temp %>/<%= yeoman.styles %>/',
        src: '{,*/}*.css'
      },
      fonts: {
        expand: true,
        cwd: '<%= yeoman.app %>/bower_components/ionic/release/fonts/',
        dest: '<%= yeoman.app %>/fonts/',
        src: '*'
      },
      vendor: {
        expand: true,
        cwd: '<%= yeoman.app %>/vendor',
        dest: '<%= yeoman.temp %>/<%= yeoman.styles %>/',
        src: '{,*/}*.css'
      },
      all: {
        expand: true,
        cwd: '<%= yeoman.app %>/',
        src: '**',
        dest: '<%= yeoman.dist %>/'
      }
    },

    concurrent: {
      server: [
        'compass:server',
        'copy:styles',
        'copy:vendor',
        'copy:fonts'
      ],
      test: [
        'compass',
        'copy:styles',
        'copy:vendor',
        'copy:fonts'
      ],
      dist: [
        'compass:dist',
        'copy:styles',
        'copy:vendor',
        'copy:fonts'
      ]
    },

    // By default, your `index.html`'s <!-- Usemin block --> will take care of
    // minification. These next options are pre-configured if you do not wish
    // to use the Usemin blocks.
    // cssmin: {
    //   dist: {
    //     files: {
    //       '<%= yeoman.dist %>/<%= yeoman.styles %>/main.css': [
    //         '<%= yeoman.temp %>/<%= yeoman.styles %>/**/*.css',
    //         '<%= yeoman.app %>/<%= yeoman.styles %>/**/*.css'
    //       ]
    //     }
    //   }
    // },
    // uglify: {
    //   dist: {
    //     files: {
    //       '<%= yeoman.dist %>/<%= yeoman.scripts %>/scripts.js': [
    //         '<%= yeoman.dist %>/<%= yeoman.scripts %>/scripts.js'
    //       ]
    //     }
    //   }
    // },
    // concat: {
    //   dist: {}
    // },

    // Test settings
    // These will override any config options in karma.conf.js if you create it.
    karma: {
      options: {
        basePath: '',
        frameworks: ['mocha', 'chai'],
        files: [
          '<%= yeoman.app %>/bower_components/angular/angular.js',
          '<%= yeoman.app %>/bower_components/angular-animate/angular-animate.js',
          '<%= yeoman.app %>/bower_components/angular-sanitize/angular-sanitize.js',
          '<%= yeoman.app %>/bower_components/angular-ui-router/release/angular-ui-router.js',
          '<%= yeoman.app %>/bower_components/ionic/release/js/ionic.js',
          '<%= yeoman.app %>/bower_components/ionic/release/js/ionic-angular.js',
          '<%= yeoman.app %>/bower_components/angular-mocks/angular-mocks.js',
          '<%= yeoman.app %>/<%= yeoman.scripts %>/**/*.js',
          'test/mock/**/*.js',
          'test/spec/**/*.js'
        ],
        autoWatch: false,
        reporters: ['dots', 'coverage'],
        port: 8080,
        singleRun: false,
        preprocessors: {
          // Update this if you change the yeoman config path
          '<%= yeoman.app %>/<%= yeoman.scripts %>/**/*.js': ['coverage']
        },
        coverageReporter: {
          reporters: [
            { type: 'html', dir: 'coverage/' },
            { type: 'text-summary' }
          ]
        }
      },
      unit: {
        // Change this to 'Chrome', 'Firefox', etc. Note that you will need
        // to install a karma launcher plugin for browsers other than Chrome.
        browsers: ['PhantomJS'],
        background: true
      },
      continuous: {
        browsers: ['PhantomJS'],
        singleRun: true,
      }
    },

    // ngAnnotate tries to make the code safe for minification automatically by
    // using the Angular long form for dependency injection.
    ngAnnotate: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.temp %>/concat/<%= yeoman.scripts %>',
          src: '*.js',
          dest: '<%= yeoman.dist %>/concat/<%= yeoman.scripts %>'
        }]
      }
    }

  });

  // Register tasks for all Cordova commands, but namespace
  // the cordova:build since we already have a build task.
  _.functions(cordova).forEach(function (name) {
    name = (name === 'build') ? 'cordova:build' : name;
    grunt.registerTask(name, function () {
      this.args.unshift(name.replace('cordova:', ''));
      // Handle URL's being split up by Grunt because of `:` characters
      if (_.contains(this.args, 'http') || _.contains(this.args, 'https')) {
        this.args = this.args.slice(0, -2).concat(_.last(this.args, 2).join(':'));
      }
      var done = this.async();
      var exec = process.platform === 'win32' ? 'cordova.cmd' : 'cordova';
      var cmd = path.resolve('./node_modules/cordova/bin', exec);
      var child = spawn(cmd, this.args);
      child.stdout.on('data', function (data) {
        grunt.log.writeln(data);
      });
      child.stderr.on('data', function (data) {
        grunt.log.error(data);
      });
      child.on('close', function (code) {
        code = (name === 'cordova:build') ? true : code ? false : true;
        done(code);
      });
    });
  });

  // Since Apache Ripple serves assets directly out of their respective platform
  // directories, we watch all registered files and then copy all un-built assets
  // over to www/. Last step is running cordova prepare so we can refresh the ripple
  // browser tab to see the changes. Technically ripple runs `cordova prepare` on browser
  // refreshes, but at this time you would need to re-run the emulator to see changes.
  grunt.registerTask('ripple', ['bower-install', 'copy:all', 'ripple-emulator']);
  grunt.registerTask('ripple-emulator', function () {
    grunt.config.set('watch', {
      all: {
        files: _.flatten(_.pluck(grunt.config.get('watch'), 'files')),
        tasks: ['copy:all', 'prepare']
      }
    });

    var cmd = path.resolve('./node_modules/ripple-emulator/bin', 'ripple');
    var child = spawn(cmd, ['emulate']);
    child.stdout.on('data', function (data) {
      grunt.log.writeln(data);
    });
    child.stderr.on('data', function (data) {
      grunt.log.error(data);
    });
    process.on('exit', function (code) {
      child.kill('SIGINT');
      process.exit(code);
    });

    return grunt.task.run(['watch']);
  });

  // Dynamically configure `karma` target of `watch` task so that
  // we don't have to run the karma test server as part of `grunt serve`
  grunt.registerTask('watch:karma', function () {
    var karma = {
      files: ['<%= yeoman.app %>/<%= yeoman.scripts %>/**/*.js', '<%= yeoman.test %>/spec/**/*.js'],
      tasks: ['newer:jshint:test', 'karma:unit:run']
    };
    grunt.config.set('watch', karma);
    return grunt.task.run(['watch']);
  });

  grunt.registerTask('ionicSass', ['gulp']);

  grunt.registerTask('serve', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'clean:server',
      'ngconstant:development',
      'bower-install',
      'concurrent:server',
      'autoprefixer',
      'connect:livereload',
      'watch'
    ]);
  });

  grunt.registerTask('test', [
    'clean:server',
    'concurrent:test',
    'autoprefixer',
    'karma:unit:start',
    'watch:karma'
  ]);

  grunt.registerTask('build', [
    'clean:dist',
    'ngconstant:production',
    'bower-install',
    'useminPrepare',
    'concurrent:dist',
    'autoprefixer',
    'concat',
    'ngAnnotate',
    'copy:dist',
    'cssmin',
    'uglify',
    'usemin',
    'htmlmin',
    'cordova:build'
  ]);

  grunt.registerTask('cordova', ['copy:all', 'cordova:build']);

  grunt.registerTask('coverage', ['karma:continuous', 'connect:coverage:keepalive']);

  grunt.registerTask('default', [
    'newer:jshint',
    'karma:continuous',
    'build'
  ]);
};
