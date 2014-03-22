/*global describe, beforeEach, it*/
'use strict';

var path    = require('path');
var helpers = require('yeoman-generator').test;

describe('Ionic Framework Generator', function () {
    beforeEach(function (done) {
        helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
            if (err) {
                return done(err);
            }

            this.app = helpers.createGenerator('ionic:app', [
                '../../app'
            ]);
            done();
        }.bind(this));
    });

    it('creates expected files', function (done) {
        this.timeout(20000);
        var expected = [
            // add files you expect to exist here.
            '.jshintrc',
            '.editorconfig'
        ];

        helpers.mockPrompt(this.app, {
            compass: false,
            plugins: []
        });
        this.app.options['skip-install'] = true;
        this.app.init = function () {};
        this.app.run({}, function () {
            helpers.assertFiles(expected);
            done();
        });
    });
});
