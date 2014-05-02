'use strict';

var path    = require('path')
  , helpers = require('yeoman-generator').test;

describe('module sub-generator', function () {
  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
      if (err) {
        return done(err);
      }

      this.module = helpers.createGenerator('vanilla:module', [
        '../../module'
      ], ['Awesome']);

      done();
    }.bind(this));
  });

  it('creates expected files', function (done) {
    var expected = [
      'modules/class.awesomemodule.php'
    ];

    helpers.mockPrompt(this.module, {
      templates: false
    });

    this.module.run({}, function () {
      helpers.assertFile(expected);
      done();
    });
  });

  describe('template generation', function () {
    it('creates Smarty views when selected as option', function (done) {
      var expected = [
        'views/modules/awesome.tpl'
      ];

      helpers.mockPrompt(this.module, {
        templates: 'Smarty'
      });

      this.module.run({}, function () {
        helpers.assertFile(expected);
        done();
      });
    });

    it('creates PHP views when selected as option', function (done) {
      var expected = [
        'views/modules/awesome.php'
      ];

      helpers.mockPrompt(this.module, {
        templates: 'PHP'
      });

      this.module.run({}, function () {
        helpers.assertFile(expected);
        done();
      });
    });
  })
});
