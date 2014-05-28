'use strict';

var gulp = require('gulp')
    // Load all Gulp tasks matching the `gulp-*` pattern
  , $ = require('gulp-load-plugins')();

gulp.task('styles', function () {
  return gulp.src('<%= extension %>/*.<%= extension %>')
    .pipe($.plumber())<% if (extension === 'less') { %>
    .pipe($.less())<% } else if (extension === 'scss') { %>
    .pipe($.scssLint({
      config: '<%= extension %>/.scss-lint.yml'
    }))
    .pipe($.sass({
      errLogToConsole: true
    }))<% } %>
    .pipe($.autoprefixer())
    .pipe($.csslint('design/.csslintrc'))
    .pipe($.csslint.reporter('default'))
    .pipe(gulp.dest('design'))
    .pipe($.size({showFiles: true}));
});

gulp.task('scripts', function () {
  var dependencies = require('wiredep')()
    , source = $.filter('js/src/**/*.js');

  return gulp.src((dependencies.js || []).concat([
    'js/src/main.js'
  ]))
    .pipe($.plumber())
    .pipe(source)
    .pipe($.jshint('js/.jshintrc'))
    .pipe($.jshint.reporter('default'))
    .pipe(source.restore())
    .pipe($.concat('custom.js'))
    .pipe(gulp.dest('js'))
    .pipe($.size({showFiles: true}));
});

gulp.task('images', function () {
  var bitmap = $.filter('**/*.{gif,jpeg,jpg,png}')
    , vector = $.filter('**/*.svg');

  return gulp.src('design/images/**/*')
    .pipe(bitmap)
    .pipe($.cache($.imagemin({
      optimizationLevel : 3
    , progressive       : true
    , interlaced        : true
    })))
    .pipe(bitmap.restore())

    .pipe(vector)
    .pipe($.svgmin())
    .pipe(vector.restore())

    .pipe(gulp.dest('design/images'))
    .pipe($.size({showFiles: true}));
});

gulp.task('fonts', function () {
  return $.bowerFiles()
    .pipe($.filter('**/*.{eot,svg,ttf,woff}'))
    .pipe($.flatten())
    .pipe(gulp.dest('design/fonts'))
    .pipe($.size({showFiles: true}));
});

gulp.task('wiredep', function () {
  var wiredep = require('wiredep').stream;

  return gulp.src('<%= extension %>/**/*.<%= extension %>')
    .pipe(wiredep())
    .pipe(gulp.dest('<%= extension %>'));
});

gulp.task('default', ['wiredep'], function () {
  gulp.start('styles', 'scripts', 'images', 'fonts');
});

gulp.task('watch', function () {
  var server = $.livereload();

  gulp.watch([
    'design/*.css'
  , 'design/images/**/*'
  , 'js/*.js'
  , 'views/**/*.tpl'
  ], function (file) {
    return server.changed(file.path);
  });

  gulp.watch('<%= extension %>/**/*.<%= extension %>', ['styles']);
  gulp.watch('js/src/**/*.js', ['scripts']);
  gulp.watch('design/images/**/*', ['images']);
  gulp.watch('bower.json', ['wiredep']);
});

// Expose Gulp to external tools
module.exports = gulp;
