'use strict';

var fs     = require('fs')
  , util   = require('util')
  , path   = require('path')
  , chalk  = require('chalk')
  , yeoman = require('yeoman-generator');

var Generator = module.exports = function () {
  yeoman.generators.Base.apply(this, arguments);

  this.pkg = yeoman.file.readJSON(path.join(__dirname, '../package.json'));

  this.option('skip-install', {
    desc: 'Do not install eventual dependecies',
    type: String,
    required: false
  });

  this.option('skip-welcome-message', {
    desc: 'Do not show the Yeoman welcome message',
    type: String,
    required: false
  });

  if (fs.existsSync(this.dest._base + '/package.json')) {
    this.addon = this.dest.readJSON('package.json');
  } else {
    this.addon = {author: false};
  }

  this.on('end', function () {
    if (!this.options['skip-install']) {
      this.npmInstall();
    }

    if (!this.options['skip-welcome-message']) {
      console.log(chalk.yellow(
        '\nThat was it! Open up this folder in your favorite editor\n' +
        'and start hacking away.\n'
      ));
    }
  });
};

util.inherits(Generator, yeoman.generators.Base);

Generator.prototype.welcome = function () {
  // Have Yeoman greet the user
  if (!this.options['skip-welcome-message']) {
    console.log(this.yeoman);
    console.log(chalk.yellow(
      'I\'m here to guide you through the process of setting up\n' +
      'a basic Addon for Vanilla. You can start by telling me a\n' +
      'little bit about yourself. I will store this information\n' +
      'in your addon so you only have to enter it once...\n'
    ));
  }
};

Generator.prototype.askForAuthor = function () {
  var next = this.async()
    , prompts = [{
      type: 'input'
    , name: 'author'
    , message: 'What is your full name?'
    , default: this.addon.author.name
    }, {
      type: 'input'
    , name: 'email'
    , message: 'I would also like your email'
    , default: this.addon.author.email
    }, {
      type: 'input'
    , name: 'url'
    , message: 'Optionally, enter your website'
    , default: this.addon.author.url
    }];

  this.prompt(prompts, function (props) {
    this.author = {
      name: props.author
    , email: props.email
    , url: props.url
    };

    next();
  }.bind(this));
};

Generator.prototype.askForLicense = function () {
  if (!this.options['skip-welcome-message']) {
    console.log(chalk.yellow(
      '\nNow for a bit of information about your addon...\n'
    ));
  }

  var next = this.async()
    , prompts = [{
      type: 'list'
    , name: 'license'
    , message: 'Which license would you like to use?'
    , default: this.addon.license || 'MIT'
    , choices: [{
        name: 'None'
      , value: false
      }, 'MIT', 'GPLv2', 'GPLv3', 'Apache']
    }];

  this.prompt(prompts, function (props) {
    this.license = props.license;

    next();
  }.bind(this));
};

Generator.prototype.askForAddon = function () {
  var next = this.async()
    , prompts = [{
      type: 'list'
    , name: 'type'
    , message: 'What kind of addon is this?'
    , choices: ['Application', 'Plugin', 'Theme']
    }, {
      type: 'input'
    , name: 'name'
    , message: 'Enter the name of your addon'
    , default: this.addon.title
    }, {
      type: 'input'
    , name: 'description'
    , message: 'Describe your addon in a sentence or two'
    , default: this.addon.description
    }, {
      type: 'checkbox'
    , name: 'extras'
    , message: 'Optional files to include in your application'
    , choices: [
        'class.hooks.php'
      , 'configuration.php'
      , 'bootstrap.php'
      , 'structure.php'
      ]
    , when: function (props) {
        return props.type === 'Application';
      }
    }, {
      type: 'checkbox'
    , name: 'extras'
    , message: 'Optional files to include in your theme'
    , choices: [
        'class.themehooks.php'
      ]
    , when: function (props) {
        return props.type === 'Theme';
      }
    }];

  this.prompt(prompts, function (props) {
    this.type = props.type;
    this.name = props.name;
    this.description = props.description;
    this.extras = props.extras || [];

    next();
  }.bind(this));
};

Generator.prototype.createFiles = function () {
  var self  = this
    , today = new Date();

  this.year      = today.getFullYear();
  this.directory = path.basename(this.dest._base);

  this.copy('editorconfig', '.editorconfig');
  this.template('licenses/' + this.license + '.md', 'LICENSE.md');
  this.template('_package.json', 'package.json');

  var extra = function (template, dest) {
      if (self.extras.indexOf(template) !== -1) {
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
