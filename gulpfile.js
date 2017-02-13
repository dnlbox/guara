'use strict';

var gulp    = require('gulp');
var connect = require('gulp-connect');
var pug     = require('gulp-pug');      // replace Jade
var changed = require('gulp-changed');
var babel   = require('gulp-babel');
var sass    = require('gulp-sass');
var size    = require('gulp-size');
var plumber = require('gulp-plumber');
var util    = require('gulp-util');

var onError = function (err) {
  util.beep();
  util.log(util.colors.yellow(err.message));
};

// HTML
gulp.task('pug', function() {
  return gulp.src('app/**/*.pug')
    .pipe(plumber({ errorHandler: onError }))
    .pipe(changed('build', {extension:'.html'}))
    .pipe(pug())
    .pipe(gulp.dest('build'))
    .pipe(connect.reload());
})

// Javascript
gulp.task('js', function() {
  return gulp.src('app/**/*.js')
    .pipe(plumber({ errorHandler: onError }))
    .pipe(changed('build', {extension:'.js'}))
    .pipe(babel())
    .pipe(gulp.dest('build'))
    .pipe(size())
    .pipe(connect.reload());
})

gulp.task('vue', function() {
  return gulp.src('node_modules/vue/dist/vue.js')
    .pipe(gulp.dest('build/js'));
})

// CSS
gulp.task('scss', function() {
  return gulp.src('app/**/*.scss')
    .pipe(plumber({ errorHandler: onError }))
    .pipe(changed('build', {extension:'.css'}))
    .pipe(sass())
    .pipe(gulp.dest('build/css'))
    .pipe(connect.reload());
})

gulp.task('bulma', function() {
  return gulp.src('node_modules/bulma/css/bulma.css')
    .pipe(gulp.dest('build/css'));
})

// Images
gulp.task('images', function() {
  return gulp.src('app/images/**/*')
    .pipe(plumber({ errorHandler: onError }))
    .pipe(gulp.dest('build/images'))
    .pipe(size({title: 'images'}));
})

// Development server setup 
gulp.task('watch', function() {
  gulp.watch('app/**/*.pug', ['pug']);
  gulp.watch('app/**/*.js', ['js']);
  gulp.watch('app/**/*.scss', ['scss']);
  gulp.watch('app/images/**/*', ['images']);  
})

gulp.task('connect', function() {
  connect.server({
    port:3000,
    root:['build'],
    livereload:true
  });
})

// build the solution
gulp.task('default', ['pug', 'js', 'vue', 'scss', 'bulma', 'images']);

// open server for development
gulp.task('serve', ['pug', 'js', 'vue', 'scss', 'bulma', 'images', 'watch', 'connect']);

