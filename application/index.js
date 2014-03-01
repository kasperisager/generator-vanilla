'use strict';

var fs = require('fs')
  , util = require('util')
  , path = require('path')
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

Generator.prototype.askFor = function () {
  var next = this.async()
    , prompts = [{
      type: 'checkbox'
    , name: 'applicationExtras'
    , message: 'Optional files to include in your application'
    , choices: [
        'class.hooks.php'
      , 'configuration.php'
      , 'bootstrap.php'
      , 'structure.php'
      ]
    }];

  this.prompt(prompts, function (props) {
    this.extras = props.applicationExtras || [];

    next();
  }.bind(this));
};

Generator.prototype.createFiles = function () {
  var self = this
    , today = new Date();

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

  this.template('about.php', 'settings/about.php');

  var extra = function (option) {
    return self.extras.indexOf(option) !== -1;
  };

  if (extra('clas.hooks.php')) {
    this.template('class.hooks.php', 'settings/class.hooks.php');
  }

  if (extra('configuration.php')) {
    this.template('configuration.php', 'settings/configuration.php');
  }

  if (extra('bootstrap.php')) {
    this.template('bootstrap.php', 'settings/bootstrap.php');
  }

  if (extra('structure.php')) {
    this.template('structure.php', 'settings/structure.php');
  }
};
