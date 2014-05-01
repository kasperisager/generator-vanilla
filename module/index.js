'use strict';

var yo    = require('yeoman-generator')
  , utils = require('../lib/utils')
  , NamedBase = yo.generators.NamedBase;

var ModuleGenerator = NamedBase.extend({
  constructor: function () {
    NamedBase.apply(this, arguments);

    this.argument('target', {
      desc: 'Asset in which to render the module'
    , defaults: 'Panel'
    });
  },

  askForTemplate: function () {
    var next = this.async()
      , prompts = [{
        type: 'list'
      , name: 'templates'
      , message: 'Which templating language would you like to use?'
      , default: this.config.get('templates') || 'Smarty'
      , choices: ['PHP', 'Smarty']
      }];

    this.prompt(prompts, function (props) {
      this.config.set('templates', props.templates);

      next();
    }.bind(this));
  },

  init: function () {
    var self = this
      , cb   = this.async()
      , base = this.dest._base()
      , type = this.config.get('type');

    var today = new Date();
    this.year = today.getFullYear();

    switch (this.config.get('templates')) {
    case 'Smarty':
      this.extension = 'tpl';
      break;
    case 'PHP':
    default:
      this.extension = 'php';
      break;
    }

    utils.getAddon(base, type, function (err, addon) {
      self.addon = addon;
      cb();
    });
  },

  files: function () {
    this.template(
      'class.module.php'
    , 'modules/class.' + this.name.toLowerCase() + 'module.php'
    );

    this.template(
      'module.' + this.extension
    , 'views/modules/' + this.name.toLowerCase() + '.' + this.extension
  );
  }
});

module.exports = ModuleGenerator;
