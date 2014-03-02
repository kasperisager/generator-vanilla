/*global describe, beforeEach, it */
'use strict';

var path    = require('path')
  , _       = require('underscore')
  , assert  = require('assert')
  , helpers = require('yeoman-generator').test
  , promptFixture = {
    author:  'John Doe'
  , email: 'john@example.com'
  , url: 'http://github.com/johndoe'
  , license: 'MIT'
  }
  , expectedFixture = [
    'package.json'
  , '.editorconfig'
  , 'LICENSE.md'
  ];

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

  describe('application', function () {
    it('creates expected files', function (done) {
      var prompt = _.extend({}, promptFixture, {
        type: 'Application'
      , name: 'Awesome App'
      , description: 'This is an awesome app!'
      , extras: [
          'class.hooks.php'
        , 'configuration.php'
        , 'bootstrap.php'
        , 'structure.php'
        ]
      })
      , expected = _.extend([], expectedFixture, [
        'settings/about.php'
      , 'settings/class.hooks.php'
      , 'settings/configuration.php'
      , 'settings/bootstrap.php'
      , 'settings/structure.php'
      ]);

      helpers.mockPrompt(this.app, prompt);

      this.app.run({}, function () {
        helpers.assertFile(expected);

        done();
      });
    });
  });

  describe('plugin', function () {
    it('creates expected files', function (done) {
      var prompt = _.extend({}, promptFixture, {
        type: 'Plugin'
      , name: 'Awesome Plugin'
      , description: 'This is an awesome plugin!'
      })
      , expected = _.extend([], expectedFixture, [
        'class.temp.plugin.php'
      ]);

      helpers.mockPrompt(this.app, prompt);

      this.app.run({}, function () {
        helpers.assertFile(expected);

        done();
      });
    });
  });

  describe('theme', function () {
    it('creates expected files', function (done) {
      var prompt = _.extend({}, promptFixture, {
        type: 'Theme'
      , name: 'Awesome Theme'
      , description: 'This is an awesome theme!'
      , extras: [
          'class.themehooks.php'
        ]
      })
      , expected = _.extend([], expectedFixture, [
        'about.php'
      , 'views/default.master.tpl'
      , 'class.themehooks.php'
      ]);

      helpers.mockPrompt(this.app, prompt);

      this.app.run({}, function () {
        helpers.assertFile(expected);

        done();
      });
    });
  });
});
