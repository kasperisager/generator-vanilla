'use strict';

var path   = require('path')
  , should = require('chai').should()
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
  });
});
