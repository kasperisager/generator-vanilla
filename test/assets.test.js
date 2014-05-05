'use strict';

var path    = require('path')
  , _       = require('lodash')
  , helpers = require('yeoman-generator').test
  , expectedFixture = [
    'package.json'
  , 'bower.json'
  , 'design/.csslintrc'
  , 'js/.jshintrc'
  , 'js/src/main.js'
  ];

var generateAssets = function (type, done) {
  helpers.testDirectory(path.join(__dirname, 'temp', 'assets', type), function (err) {
    if (err) {
      return done(err);
    }

    var assets = helpers.createGenerator('vanilla:assets', [
      '../../../../assets'
    ]);

    assets.options['skip-install'] = true;

    done(false, assets);
  });
};

describe('assets sub-generator', function () {
  it('creates base files and Gulp workflow with LESS', function (done) {
    var expected = _.extend([], expectedFixture, [
      'gulpfile.js'
    , 'less/custom.less'
    ]);

    generateAssets('gulp-less', function (err, assets) {
      if (err) {
        return done(err);
      }

      helpers.mockPrompt(assets, {
        preprocessor: 'LESS'
      , buildtool: 'Gulp'
      });

      assets.run({}, function () {
        helpers.assertFile(expected);
        done();
      });
    });
  });

  it('creates base files and Gulp workflow with SCSS', function (done) {
    var expected = _.extend([], expectedFixture, [
      'gulpfile.js'
    , 'scss/custom.scss'
    ]);

    generateAssets('gulp-sass', function (err, assets) {
      if (err) {
        return done(err);
      }

      helpers.mockPrompt(assets, {
        preprocessor: 'SCSS'
      , buildtool: 'Gulp'
      });

      assets.run({}, function () {
        helpers.assertFile(expected);
        done();
      });
    });
  });

  it('creates base files and Grunt workflow with LESS', function (done) {
    var expected = _.extend([], expectedFixture, [
      'Gruntfile.js'
    , 'less/custom.less'
    ]);

    generateAssets('grunt-less', function (err, assets) {
      if (err) {
        return done(err);
      }

      helpers.mockPrompt(assets, {
        preprocessor: 'LESS'
      , buildtool: 'Grunt'
      });

      assets.run({}, function () {
        helpers.assertFile(expected);
        done();
      });
    });
  });

  it('creates base files and Grunt workflow with SCSS', function (done) {
    var expected = _.extend([], expectedFixture, [
      'Gruntfile.js'
    , 'scss/custom.scss'
    ]);

    generateAssets('grunt-sass', function (err, assets) {
      if (err) {
        return done(err);
      }

      helpers.mockPrompt(assets, {
        preprocessor: 'SCSS'
      , buildtool: 'Grunt'
      });

      assets.run({}, function () {
        helpers.assertFile(expected);
        done();
      });
    });
  });
});
