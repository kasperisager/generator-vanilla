/*global describe, beforeEach, it */
'use strict';

var path    = require('path')
  , assert  = require('assert')
  , helpers = require('yeoman-generator').test
  , fixture = {
    name: 'Awesome App'
  , description: 'This is an awesome app!'
  , author:  'John Doe'
  , email: 'john@example.com'
  , url: 'http://github.com/johndoe'
  , license: 'MIT'
  };

describe('vanilla generator', function () {
  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
      if (err) {
        return done(err);
      }

      this.app = helpers.createGenerator('vanilla:app', [
        '../../app'
      ]);
      this.app.options['skip-install'] = true;
      this.app.options['skip-welcome-message'] = true;

      done();
    }.bind(this));
  });

  it('can be imported without blowing up', function () {
    var app = require('../app');

    assert(app !== undefined);
  });

  it('creates expected files', function (done) {
    var expected = [
      'package.json'
    , '.editorconfig'
    ];

    helpers.mockPrompt(this.app, fixture);

    this.app.run({}, function () {
      helpers.assertFile(expected);

      done();
    });
  });
});
