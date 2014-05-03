'use strict';

var path    = require('path')
  , helpers = require('yeoman-generator').test;

describe('model sub-generator', function () {
  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, 'temp', 'model'), function (err) {
      if (err) return done(err);

      this.model = helpers.createGenerator('vanilla:model', [
        '../../../model'
      ], ['Awesome']);

      done();
    }.bind(this));
  });

  it('creates expected files', function (done) {
    var expected = [
      'models/class.awesomemodel.php'
    ];

    this.model.run({}, function () {
      helpers.assertFile(expected);
      done();
    });
  });
});
