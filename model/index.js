'use strict';

var yo    = require('yeoman-generator')
  , utils = require('../lib/utils')
  , NamedBase = yo.generators.NamedBase;

var ModelGenerator = NamedBase.extend({
  init: function () {
    var self = this
      , cb   = this.async()
      , base = this.dest._base()
      , type = this.config.get('type');

    var today = new Date();
    this.year = today.getFullYear();

    utils.getAddon(base, type, function (err, addon) {
      self.addon = addon;
      cb();
    });
  },

  files: function () {
    this.template(
      'class.model.php',
      'models/class.' + this.name.toLowerCase() + 'model.php'
    );
  }
});

module.exports = ModelGenerator;
