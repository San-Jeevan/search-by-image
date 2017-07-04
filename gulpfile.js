var path = require('path');
var exec = require('child_process').exec;
var gulp = require('gulp');
var gulpSeq = require('gulp-sequence');
var webpack = require('webpack');
var htmlmin = require('gulp-htmlmin');
var svgmin = require('gulp-svgmin');
var del = require('del');

gulp.task('clean', function() {
  return del(['dist']);
});

gulp.task('js', function(done) {
  exec('webpack --display-error-details --colors', function(
    err,
    stdout,
    stderr
  ) {
    console.log(stdout);
    console.log(stderr);
    done(err);
  });
});

gulp.task('html', function() {
  return gulp
    .src('src/**/*.html', {base: '.'})
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('dist'));
});

gulp.task('svg', function() {
  return gulp
    .src('src/**/*.svg', {base: '.'})
    .pipe(svgmin())
    .pipe(gulp.dest('dist'));
});

gulp.task('copy', function() {
  gulp
    .src([
      'src/manifest.json',
      'src/_locales*/**/*',
      'LICENSE',
      'src*/content/insert.js',
      'src*/content/parse.js',
      'src*/content/probe.js'
    ])
    .pipe(gulp.dest('dist'));
});

gulp.task('build', gulpSeq('clean', ['js', 'html', 'svg', 'copy']));

gulp.task('default', ['build']);