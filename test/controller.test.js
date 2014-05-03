'use strict';

var path    = require('path')
  , helpers = require('yeoman-generator').test;

describe('controller sub-generator', function () {
  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, 'temp', 'controller'), function (err) {
      if (err) {
        return done(err);
      }

      this.controller = helpers.createGenerator('vanilla:controller', [
        '../../../controller'
      ], ['Awesome']);

      done();
    }.bind(this));
  });

  it('creates expected files', function (done) {
    var expected = [
      'controllers/class.awesomecontroller.php'
    ];

    this.controller.run({}, function () {
      helpers.assertFile(expected);
      done();
    });
  });
});
