'use strict';

var yo      = require('yeoman-generator')
  , langmap = require('langmap')
  , chalk   = require('chalk')
  , utils   = require('../lib/utils')
  , NamedBase = yo.generators.NamedBase;

var LocaleGenerator = NamedBase.extend({
  init: function () {
    var self = this
      , cb   = this.async()
      , base = this.dest._base()
      , type = this.config.get('type');

    var today = new Date();
    this.year = today.getFullYear();

    this.locale = langmap[this.name];

    utils.getAddon(base, type, function (err, addon) {
      self.addon = addon;
      cb();
    });
  },

  files: function () {
    if (!this.locale) {
      return console.log(chalk.red('Your locale was not created as the language code supplied was invalid'));
    }

    this.template(
      'definitions.php',
      'locale/' + this.name + '.php'
    );
  }
});

module.exports = LocaleGenerator;
