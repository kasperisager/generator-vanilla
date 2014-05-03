'use strict';

module.exports = function (grunt) {
  // Load all Grunt tasks matching the `grunt-*` pattern
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Load Bower dependencies
  var dependencies = require('wiredep')();

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    watch: {
      bower: {
        files: ['bower.json']
      , tasks: ['bowerInstall']
      }
    , js: {
        files: ['js/src/**/*.js']
      , tasks: ['jshint', 'concat']
      }
    , gruntfile: {
        files: ['Gruntfile.js']
      }<% if (extension === 'less') { %>
    , less: {
        files: ['less/**/*.less']
      , tasks: ['less', 'autoprefixer', 'csslint']
      }<% } else if (extension === 'scss') { %>
    , sass: {
        files: ['scss/**/*.scss']
      , tasks: ['sass', 'autoprefixer', 'csslint']
      }<% } %>
    , livereload: {
        options: {
          livereload: true
        }
      , files: [
          'design/**/*.css'
        , 'design/images/**/*'
        , 'js/**/*.js'
        , 'views/**/*.tpl'
        ]
      }
    },<% if (extension === 'less') { %>

    less: {
      dist: {
        options: {
          strictMath: true
        , sourceMap: true
        , sourceMapURL: 'custom.css.map'
        , sourceMapFilename: 'design/custom.css.map'
        }
      , files: {
          'design/custom.css': '<%= stylesheet %>'
        }
      }
    },<% } else if (extension === 'scss') { %>

    sass: {
      dist: {
        options: {
          sourceComments: 'map'
        }
      , files: {
          'design/custom.css': '<%= stylesheet %>'
        }
      }
    },<% } %>

    autoprefixer: {
      dist: {
        src: ['design/**/*.css']
      }
    },

    jshint: {
      options: {
        jshintrc: 'js/.jshintrc'
      }
    , all: ['js/src/**/*.js']
    },

    csslint: {
      options: {
        csslintrc: 'design/.csslintrc'
      }
    , all: ['design/custom.css']
    },

    concat: {
      dist: {
        src: (dependencies.js || []).concat([
          'js/src/main.js'
        ])
      , dest: 'js/custom.js'
      }
    },

    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: 'design/images',
          src: '**/*.{gif,jpeg,jpg,png}',
          dest: 'design/images'
        }]
      }
    },

    bowerInstall: {
      dist: {
        src: ['<%= extension %>/**/*.<%= extension %>']
      }
    }

  });

  grunt.registerTask('default', [
    'bowerInstall'<% if (extension === 'less') { %>
  , 'less'<% } else if (extension === 'scss') { %>
  , 'sass'<% } %>
  , 'autoprefixer'
  , 'concat'
  , 'jshint'
  , 'csslint'
  , 'imagemin'
  ]);
};
