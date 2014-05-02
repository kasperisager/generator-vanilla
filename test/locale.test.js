'use strict';

var path    = require('path')
  , should  = require('chai').should()
  , helpers = require('yeoman-generator').test;

var generateLocale = function (code, done) {
  helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
    if (err) {
      return done(err);
    }

    var locale = helpers.createGenerator('vanilla:locale', [
      '../../locale'
    ], code);

    done(null, locale);
  });
}

describe('locale sub-generator', function () {
  it('generates locale when provided with valid code', function (done) {
    generateLocale('en-CA', function (err, locale) {
      if (err) {
        return done(err);
      }

      var expected = [
        'locale/en-CA.php'
      ];

      locale.run({}, function () {
        helpers.assertFile(expected);
        done();
      });
    });
  });

  it('does not generate locale when provided with invalid code', function (done) {
    generateLocale('qq-QQ', function (err, locale) {
      if (err) {
        return done(err);
      }

      var notExpected = [
        'locale/qq-QQ.php'
      ];

      locale.run({}, function () {
        helpers.assertNoFile(notExpected);
        done();
      });
    });
  });
});
