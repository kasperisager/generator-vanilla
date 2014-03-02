'use strict';

var fs     = require('fs')
  , util   = require('util')
  , path   = require('path')
  , yeoman = require('yeoman-generator');

var Generator = module.exports = function () {
  yeoman.generators.Base.apply(this, arguments);

  this.argument('name', {
    type: String,
    required: false
  });

  if (fs.existsSync(this.dest._base + '/package.json')) {
    this.addon = this.dest.readJSON('package.json');
  } else {
    this.addon = {author: false};
  }
};

util.inherits(Generator, yeoman.generators.Base);

Generator.prototype.createFiles = function () {
  var self  = this
    , today = new Date();

  this.year        = today.getFullYear();
  this.directory   = path.basename(this.dest._base);
  this.type        = this.options.type;
  this.name        = this.name || this.addon.title;
  this.description = this.options.description || this.addon.description;
  this.license     = this.options.license || this.addon.license;

  this.author = {
    name  : this.options.author || this.addon.author.name
  , email : this.options.email || this.addon.author.email
  , url   : this.options.url  || this.addon.author.url
  };

  var extras = this.options.extras || []
    , extra  = function (template, dest) {
      if (extras.indexOf(template) !== -1) {
        self.template(template, dest);
      }
    };

  switch (this.type) {
    case 'Application':
      this.template('about.php', 'settings/about.php');

      // Optional application files
      extra('class.hooks.php', 'settings/class.hooks.php');
      extra('configuration.php', 'settings/configuration.php');
      extra('bootstrap.php', 'settings/bootstrap.php');
      extra('structure.php', 'settings/structure.php');
      break;

    case 'Plugin':
      this.template(
        'class.plugin.php',
        'class.' + this.directory.toLowerCase() + '.plugin.php'
      );
      break;

    case 'Theme':
      this.copy('default.master.tpl', 'views/default.master.tpl');
      this.template('about.php', 'about.php');

      // Optional theme files
      extra('class.themehooks.php', 'class.themehooks.php');
      break;
  }
};
