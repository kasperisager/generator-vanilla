'use strict';

var fs    = require('fs')
  , path  = require('path')
  , yo    = require('yeoman-generator')
  , _     = require('lodash')
  , utils = require('../lib/utils')
  , Base  = yo.generators.Base;

var AssetsGenerator = Base.extend({
  constructor: function () {
    Base.apply(this, arguments);

    this.option('skip-install', {
      desc: 'Do not install eventual dependecies'
    });

    this.on('end', function () {
      /* istanbul ignore if */
      if (!this.options['skip-install']) {
        this.npmInstall();
      }
    });
  },

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

  askForPreprocessor: function () {
    var next = this.async()
      , prompts = [{
        type: 'list'
      , name: 'preprocessor'
      , message: 'Which CSS preprocessor would you like to use?'
      , default: this.config.get('preprocessor') || 'LESS'
      , choices: ['LESS', 'SCSS']
      }];

    this.prompt(prompts, function (props) {
      this.preprocessor = props.preprocessor;

      // Save preprocessor choice to config
      this.config.set('preprocessor', props.preprocessor);

      next();
    }.bind(this));
  },

  askForBuildTool: function () {
    var next = this.async()
      , prompts = [{
        type: 'list'
      , name: 'buildtool'
      , message: 'Which build tool would you like to use?'
      , default: this.config.get('buildtool') || 'Gulp'
      , choices: ['Gulp', 'Grunt']
      }];

    this.prompt(prompts, function (props) {
      this.buildtool = props.buildtool;

      // Save build tool choice to config
      this.config.set('buildtool', props.buildtool);

      next();
    }.bind(this));
  },

  files: function () {
    var next = this.async();

    this.template('_package.json', 'package.json');
    this.template('_bower.json', 'bower.json');
    this.template('csslintrc', 'design/.csslintrc');
    this.template('jshintrc', 'js/.jshintrc');
    this.template('main.js', 'js/src/main.js');

    this.extension  = this.preprocessor.toLowerCase();
    this.stylesheet = this.extension + '/custom.' + this.extension;

    this.template('custom.' + this.extension, this.stylesheet);

    switch (this.buildtool) {
    case 'Gulp':
      this.template('gulpfile.js');
      break;
    case 'Grunt':
      this.template('Gruntfile.js');
      break;
    }

    fs.exists(path.resolve(this.dest._base(), 'README.md'), function (exists) {
      if (exists) {
        var instructions = _.template(this.read('README.md'), this);

        // Append the pipeline instructions to the project README
        this.write('README.md', this.readFileAsString('README.md').replace(
          '---\nCopyright'
        , instructions + '\n---\nCopyright'
        ));
      }

      next();
    }.bind(this));
  }
});

module.exports = AssetsGenerator;
