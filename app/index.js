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

    this.invoke('vanilla:addon', {
      args: [this.name]
    , options: {
        type: this.type
      , description: this.description
      , license: this.license
      , author: this.author.name
      , email: this.author.email
      , url: this.author.url
      , extras: props.extras || []
      }
    }, next);
  }.bind(this));
};

Generator.prototype.createFiles = function () {
  var today = new Date();

  this.year = today.getFullYear();

  this.copy('editorconfig', '.editorconfig');
  this.template('licenses/' + this.license + '.md', 'LICENSE.md');
  this.template('_package.json', 'package.json');
};

/*
var VanillaGenerator = yeoman.generators.Base.extend({
  askFor: function () {
    var done = this.async();

    var prompts = [{
      type: 'list'
    , name: 'preprocessor'
    , message: 'Which CSS preprocessor would you like to use?'
    , default: 'less'
    , choices: [{
        name: 'None'
      , value: false
      }, {
        name: 'LESS (.less)'
      , value: 'less'
      }, {
        name: 'Sass (.scss)'
      , value: 'sass'
      }]
    }, {
      type: 'list'
    , name: 'automation'
    , message: 'Which automation tool would you like to use?'
    , default: false
    , choices: ['Gulp', 'Grunt']
    , when: function (answers) {
        return answers.preprocessor;
      }
    }];

    this.prompt(prompts, function (props) {
      this.preprocessor = props.preprocessor;
      this.automation = props.automation;

      done();
    }.bind(this));
  }
});
*/
