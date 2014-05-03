'use strict';

var path    = require('path')
  , _       = require('lodash')
  , helpers = require('yeoman-generator').test
  , expectedFixture = [
      'modules/class.awesomemodule.php'
    ];

var generateModule = function (template, done) {
  helpers.testDirectory(path.join(__dirname, 'temp', 'module', template), function (err) {
    if (err) {
      return done(err);
    }

    var module = helpers.createGenerator('vanilla:module', [
      '../../../../module'
    ], ['Awesome']);

    done(false, module);
  });
};

describe('module sub-generator', function () {
  it('creates base files and Smarty views', function (done) {
    var expected = _.extend([], expectedFixture, [
      'views/modules/awesome.tpl'
    ]);

    generateModule('smarty', function (err, module) {
      helpers.mockPrompt(module, {
        templates: 'Smarty'
      });

      module.run({}, function () {
        helpers.assertFile(expected);
        done();
      });
    });
  });

  it('creates base files and PHP views', function (done) {
    var expected = _.extend([], expectedFixture, [
      'views/modules/awesome.php'
    ]);

    generateModule('php', function (err, module) {
      helpers.mockPrompt(module, {
        templates: 'PHP'
      });

      module.run({}, function () {
        helpers.assertFile(expected);
        done();
      });
    });
  });
});
