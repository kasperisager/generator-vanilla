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
  , 'README.md'
  , 'LICENSE.md'
  ];

var generateAddon = function (type, done) {
  helpers.testDirectory(path.join(__dirname, 'temp', type), function (err) {
    if (err) {
      return done(err);
    }

    var addon = helpers.createGenerator('vanilla:app', [
      '../../../app'
    ]);

    addon.options['skip-welcome-message'] = true;

    done(false, addon);
  });
}

describe('addon generator', function () {
  it('can be imported without blowing up', function () {
    var app = require('../app');

    assert(app !== undefined);
  });

  describe('application generation', function () {
    it('creates expected files', function (done) {
      var prompt = _.extend({}, promptFixture, {
        type: 'Application'
      , name: 'Awesome App'
      , description: 'This is an awesome app!'
      , url: 'https://github.com/johndoe/awesome-app'
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

      generateAddon('application', function (err, application) {
        if (err) {
          return done(err);
        }

        helpers.mockPrompt(application, prompt);

        application.run({}, function () {
          helpers.assertFile(expected);
          done();
        });
      });
    });
  });

  describe('plugin generation', function () {
    it('creates expected files', function (done) {
      var prompt = _.extend({}, promptFixture, {
        type: 'Plugin'
      , name: 'Awesome Plugin'
      , description: 'This is an awesome plugin!'
      , url: 'https://github.com/johndoe/awesome-plugin'
      })
      , expected = _.extend([], expectedFixture, [
        'class.plugin.plugin.php'
      ]);

      generateAddon('plugin', function (err, plugin) {
        if (err) {
          return done(err);
        }

        helpers.mockPrompt(plugin, prompt);

        plugin.run({}, function () {
          helpers.assertFile(expected);
          done();
        });
      });
    });
  });

  describe('theme generation', function () {
    it('creates expected files', function (done) {
      var prompt = _.extend({}, promptFixture, {
        type: 'Theme'
      , name: 'Awesome Theme'
      , description: 'This is an awesome theme!'
      , url: 'https://github.com/johndoe/awesome-theme'
      , extras: [
          'class.themehooks.php'
        ]
      })
      , expected = _.extend([], expectedFixture, [
        'about.php'
      , 'views/default.master.tpl'
      , 'class.themehooks.php'
      ]);

      generateAddon('theme', function (err, theme) {
        if (err) {
          return done(err);
        }

        helpers.mockPrompt(theme, prompt);

        theme.run({}, function () {
          helpers.assertFile(expected);
          done();
        });
      });
    });
  });
});
