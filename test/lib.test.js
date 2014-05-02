'use strict';

var path   = require('path')
  , should = require('chai').should()
  , expect = require('chai').expect
  , utils  = require('../lib/utils');

describe('generator utitilies', function () {
  describe('#getAddon()', function () {
    it('parses application meta into JSON', function (done) {
      var fixture = require('./fixtures/application/settings/about.json')
        , base    = path.resolve(__dirname, 'fixtures/application');

      utils.getAddon(base, 'Application', function (err, addon) {
        if (err) {
          return done(err);
        }

        addon.should.deep.equal(fixture);
        done();
      });
    });

    it('parses theme meta into JSON', function (done) {
      var fixture = require('./fixtures/theme/about.json')
        , base    = path.resolve(__dirname, 'fixtures/theme');

      utils.getAddon(base, 'Theme', function (err, addon) {
        if (err) {
          return done(err);
        }

        addon.should.deep.equal(fixture);
        done();
      });
    });

    it('fails when passed invalid or unsupported addon type', function (done) {
      var fixture = require('./fixtures/theme/about.json')
        , base    = path.resolve(__dirname, 'fixtures/theme');

      utils.getAddon(base, 'Invalid', function (err, addon) {
        expect(err).to.be.defined;
        expect(addon).to.be.undefined;
        done();
      });
    });

    it('fails when passed non-existing files', function (done) {
      utils.getAddon('i/do/not/exist', 'Theme', function (err, addon) {
        expect(err).to.be.defined;
        expect(addon).to.be.undefined;
        done();
      });
    });

    it('fails when addon meta is not valid PHP', function (done) {
      var base = path.resolve(__dirname, 'fixtures/malformed');

      utils.getAddon(base, 'Theme', function (err, addon) {
        expect(err).to.be.defined;
        expect(addon).to.be.undefined;
        done();
      });
    })
  });
});
