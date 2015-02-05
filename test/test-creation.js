/*global describe, it, beforeEach */
'use strict';

var path = require('path');
var helpers = require('yeoman-generator').test;

describe('Ionic Generator', function () {

  beforeEach(function (done) {

    helpers
      .testDirectory(path.join(__dirname, 'temp'), function (err) {
        if (err) {
          return done(err);
        }
        this.app = helpers.createGenerator(
          'ionic:app', [
            '../../app'
          ]);

        done();
      }.bind(this));
  });

  it('creates expected files', function () {

    var expected = [
      'config.xml',
      'www/index.html',
      'www/js/index.js',
      '.bowerrc',
      '.editorconfig',
      '.gitignore',
      '.jshintrc',
      'Gruntfile.js',
      'package.json',
      'bower.json'
    ];

    helpers.mockPrompt(this.app, {
      compass: false,
      plugins: ['com.ionic.keyboard'],
      starter: 'Tabs'
    });

    this.app.options['skip-install'] = false;

    this.app.run({}, function () {
      helpers.assertFile(expected);
      done();
    })

  });
});

