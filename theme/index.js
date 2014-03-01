'use strict';

var fs     = require('fs')
  , util   = require('util')
  , path   = require('path')
  , yeoman = require('yeoman-generator');

var Generator = module.exports = function (args, options) {
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
  var today = new Date();

  this.year = today.getFullYear();
  this.directory = path.basename(this.dest._base);
  this.name = this.name || this.addon.title;
  this.description = this.options.description || this.addon.description;
  this.license = this.options.license || this.addon.license;

  this.author = {
    name: this.options.author || this.addon.author.name
  , email: this.options.email || this.addon.author.email
  , url: this.options.url  || this.addon.author.url
  };

  this.copy('default.master.tpl', 'views/default.master.tpl');
  this.template('about.php', 'about.php');

  var extras = this.options.extras || []
    , extra  = function (option) {
      return extras.indexOf(option) !== -1;
    };

  if (extra('class.themehooks.php')) {
    this.template('class.themehooks.php', 'class.themehooks.php');
  }
};
