'use strict';

var _     = require('lodash')
  , yo    = require('yeoman-generator')
  , utils = require('../lib/utils')
  , NamedBase = yo.generators.NamedBase;

var Generator = module.exports = NamedBase.extend({
  constructor: function () {
    NamedBase.apply(this, arguments);

    this.option('tpl', {
      desc: 'Use Smarty template for the module view'
    });

    this.argument('target', {
      desc: 'Asset in which to render the module'
    , defaults: 'Panel'
    });
  },

  init: function () {
    var self = this
      , cb   = this.async()
      , base = this.dest._base()
      , type = this.config.get('type');

    var today = new Date();
    this.year = today.getFullYear();

    this.extension = (this.options.tpl) ?  'tpl' : 'php';

    utils.getAddon(base, type, function (err, addon) {
      self.addon = addon;
      cb();
    });
  },

  createFiles: function () {
    this.template(
      'class.module.php'
    , 'modules/class.' + this.name.toLowerCase() + 'module.php'
    );

    this.template(
      'module.' + this.extension
    , 'views/modules/' + this.name.toLowerCase() + '.' + this.extension
    )
  }
});
