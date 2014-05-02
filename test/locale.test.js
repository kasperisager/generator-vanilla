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

      locale.run({}, function () {
        helpers.assertFile([
          'locale/en-CA.php'
        ]);

        done();
      });
    });
  });

  it('does not generate locale when provided with invalid code', function (done) {
    generateLocale('qq-QQ', function (err, locale) {
      if (err) {
        return done(err);
      }

      locale.run({}, function () {
        helpers.assertNoFile([
          'locale/qq-QQ.php'
        ]);

        done();
      });
    });
  });
});
