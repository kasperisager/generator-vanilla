'use strict';

var path    = require('path')
  , helpers = require('yeoman-generator').test;

describe('module sub-generator', function () {
  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
      if (err) return done(err);

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

    this.module.run({}, function () {
      helpers.assertFile(expected);
      done();
    });
  });
});
