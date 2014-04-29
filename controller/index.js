'use strict';

var utils = require('../lib/utils')
  , yo    = require('yeoman-generator')
  , NamedBase = yo.generators.NamedBase;

var Generator = module.exports = NamedBase.extend({
  init: function () {
    var self = this
      , cb   = this.async()
      , base = this.dest._base()
      , type = this.config.get('type');

    utils.getAddon(base, type, function (err, addon) {
      self.addon = addon;
      cb();
    });
  },

  createFiles: function () {
    var today = new Date();
    this.year = today.getFullYear();

    this.template(
      'class.controller.php',
      'controllers/class.' + this.name.toLowerCase() + 'controller.php'
    );
  }
});
