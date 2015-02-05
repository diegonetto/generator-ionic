/*global describe, it, beforeEach */
'use strict';

var assert = require('yeoman-generator').assert;

describe('Ionic Generator load test', function () {
    it('can be imported without blowing up', function () {
      assert(require('../app') !== undefined);
    });
});