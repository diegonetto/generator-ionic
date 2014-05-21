// Generated on <%= (new Date).toISOString().split('T')[0] %> using <%= pkg.name %> <%= pkg.version %>
'use strict';

var _ = require('lodash');
var path = require('path');
var cordova = require('cordova');
var spawn = require('child_process').spawn;

module.exports = function (grunt) {

  // Load grunt tasks automatically
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
      images: 'images'
    },

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      js: {
        files: ['<%%= yeoman.app %>/<%%= yeoman.scripts %>/**/*.js'],
        tasks: ['newer:jshint:all'],
        options: {
          livereload: true
        }
      },<% if (compass) { %>
      compass: {
        files: ['<%%= yeoman.app %>/<%%= yeoman.styles %>/**/*.{scss,sass}'],
        tasks: ['compass:server', 'autoprefixer']
      },<% } else { %>
      styles: {
        files: ['<%%= yeoman.app %>/<%%= yeoman.styles %>/**/*.css'],
        tasks: ['newer:copy:styles', 'autoprefixer']
      },<% } %>
      gruntfile: {
        files: ['Gruntfile.js']
      },
      livereload: {
        options: {
          livereload: '<%%= connect.options.livereload %>'
        },
        files: [
          '<%%= yeoman.app %>/*.html',
          '<%%= yeoman.app %>/templates/**/*.html',
          '.tmp/<%%= yeoman.styles %>/**/*.css',
          '<%%= yeoman.app %>/<%%= yeoman.images %>/**/*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
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
            '.tmp',
            '<%%= yeoman.app %>'
          ]
        }
      },
      dist: {
        options: {
          base: 'www'
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
        '<%%= yeoman.app %>/<%%= yeoman.scripts %>/**/*.js'
      ],
      test: {
        options: {
          jshintrc: 'test/.jshintrc'
        },
        src: ['test/unit/**/*.js']
      }
    },

    // Empties folders to start fresh
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            'www/*',
            '!www/.git*'
          ]
        }]
      },
      server: '.tmp'
    },
    
    autoprefixer: {
      options: {
        browsers: ['last 1 version']
      },
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/<%%= yeoman.styles %>/',
          src: '{,*/}*.css',
          dest: '.tmp/<%%= yeoman.styles %>/'
        }]
      }
    },

    // Automatically inject Bower components into the app
    'bower-install': {
      app: {
        html: '<%%= yeoman.app %>/index.html',
        ignorePath: '<%%= yeoman.app %>/'
      }
    },
    
    <% if (compass) { %>
    // Compiles Sass to CSS and generates necessary files if requested
    compass: {
      options: {
        sassDir: '<%%= yeoman.app %>/<%%= yeoman.styles %>',
        cssDir: '.tmp/<%%= yeoman.styles %>',
        generatedImagesDir: '.tmp/img/generated',
        imagesDir: '<%%= yeoman.app %>/img',
        javascriptsDir: '<%%= yeoman.app %>/<%%= yeoman.scripts %>',
        fontsDir: '<%%= yeoman.app %>/<%%= yeoman.styles %>/fonts',
        importPath: '<%%= yeoman.app %>/bower_components',
        httpImagesPath: '/img',
        httpGeneratedImagesPath: '/img/generated',
        httpFontsPath: '/<%%= yeoman.styles %>/fonts',
        relativeAssets: false,
        assetCacheBuster: false,
        raw: 'Sass::Script::Number.precision = 10\n'
      },
      dist: {
        options: {
          generatedImagesDir: '<%%= yeoman.dist %>/img/generated'
        }
      },
      server: {
        options: {
          debugInfo: true
        }
      }
    },
    <% } %>

    // Reads HTML for usemin blocks to enable smart builds that automatically
    // concat, minify and revision files. Creates configurations in memory so
    // additional tasks can operate on them
    useminPrepare: {
      html: '<%%= yeoman.app %>/index.html',
      options: {
        dest: 'www',
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
      html: ['www/**/*.html'],
      css: ['www/<%%= yeoman.styles %>/**/*.css'],
      options: {
        assetsDirs: ['www']
      }
    },

    // The following *-min tasks produce minified files in the dist folder
    cssmin: {
      options: {
        root: '<%%= yeoman.app %>',
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
          cwd: 'www',
          src: ['*.html', 'templates/**/*.html'],
          dest: 'www'
        }]
      }
    },

    // Copies remaining files to places other tasks can use
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%%= yeoman.app %>',
          dest: 'www',
          src: [
            'images/**/*.{png,jpg,jpeg,gif,webp,svg}',
            '*.html',
            'templates/**/*.html',
            'fonts/*',
            'res/**'
          ]
        }, {
          expand: true,
          cwd: '.tmp/<%%= yeoman.images %>',
          dest: 'www/<%%= yeoman.images %>',
          src: ['generated/*']
        }]
      },
      styles: {
        expand: true,
        cwd: '<%%= yeoman.app %>/<%%= yeoman.styles %>',
        dest: '.tmp/<%%= yeoman.styles %>/',
        src: '{,*/}*.css'
      },
      fonts: {
        expand: true,
        cwd: 'app/bower_components/ionic/release/fonts/',
        dest: '<%%= yeoman.app %>/fonts/',
        src: '*'
      },
      vendor: {
        expand: true,
        cwd: '<%%= yeoman.app %>/vendor',
        dest: '.tmp/<%%= yeoman.styles %>/',
        src: '{,*/}*.css'
      },
      all: {
        expand: true,
        cwd: '<%%= yeoman.app %>/',
        src: '**',
        dest: 'www/'
      }
    },
    
    concurrent: {
      server: [<% if (compass) { %>
        'compass:server',<% } %>
        'copy:styles',
        'copy:vendor',
        'copy:fonts'
      ],
      test: [<% if (compass) { %>
        'compass',<% } %>
        'copy:styles',
        'copy:vendor',
        'copy:fonts'
      ],
      dist: [<% if (compass) { %>
        'compass:dist',<% } %>
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
    //       'www/<%%= yeoman.styles %>/main.css': [
    //         '.tmp/<%%= yeoman.styles %>/**/*.css',
    //         '<%%= yeoman.app %>/<%%= yeoman.styles %>/**/*.css'
    //       ]
    //     }
    //   }
    // },
    // uglify: {
    //   dist: {
    //     files: {
    //       'www/<%%= yeoman.scripts %>/scripts.js': [
    //         'www/<%%= yeoman.scripts %>/scripts.js'
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
          '<%%= yeoman.app %>/bower_components/angular/angular.js',
          '<%%= yeoman.app %>/bower_components/angular-animate/angular-animate.js',
          '<%%= yeoman.app %>/bower_components/angular-sanitize/angular-sanitize.js',
          '<%%= yeoman.app %>/bower_components/angular-ui-router/release/angular-ui-router.js',
          '<%%= yeoman.app %>/bower_components/ionic/release/js/ionic.js',
          '<%%= yeoman.app %>/bower_components/ionic/release/js/ionic-angular.js',
          '<%%= yeoman.app %>/bower_components/angular-mocks/angular-mocks.js',
          '<%%= yeoman.app %>/<%%= yeoman.scripts %>/**/*.js',
          'test/mock/**/*.js',
          'test/spec/**/*.js'
        ],
        autoWatch: false,
        reporters: ['dots', 'coverage'],
        port: 8080,
        singleRun: false,
        preprocessors: {
          // Update this if you change the yeoman config path
          'app/scripts/**/*.js': ['coverage']
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

    // ngmin tries to make the code safe for minification automatically by
    // using the Angular long form for dependency injection. It doesn't work on
    // things like resolve or inject so those have to be done manually.
    ngmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/concat/<%%= yeoman.scripts %>',
          src: '*.js',
          dest: '.tmp/concat/<%%= yeoman.scripts %>'
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
      var cmd = path.resolve('./node_modules/cordova/bin', '<%= process.platform === 'win32' ? 'cordova.cmd' : 'cordova' %>');
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
  // over to www/. Last step is running ordova prepare so we can refresh the ripple
  // browser tab to see the changes.
  grunt.registerTask('ripple', ['bower-install', 'copy:all', 'prepare', 'ripple-emulator']);
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
      files: ['<%%= yeoman.app %>/<%%= yeoman.scripts %>/**/*.js', 'test/spec/**/*.js'],
      tasks: ['newer:jshint:test', 'karma:unit:run']
    };
    grunt.config.set('watch', karma);
    return grunt.task.run(['watch']);
  });

  grunt.registerTask('serve', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'clean:server',
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
    'bower-install',
    'useminPrepare',
    'concurrent:dist',
    'autoprefixer',
    'concat',
    'ngmin',
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
