/**
 *
 *  Gulp Aurora
 *  Boilerplate for Web Development
 *  Note: For Guara app,
 *        using Vue.js and Bulma css
 *
 *  Daniel Leite (2017)
 *  MIT License;
 *
 */
'use strict';

// Gulp and Plugin definitions
var gulp     = require('gulp');
var connect  = require('gulp-connect');
var pug      = require('gulp-pug'); // new name of Jade
var changed  = require('gulp-changed');
var babel    = require('gulp-babel');
var sass     = require('gulp-sass');
var size     = require('gulp-size');
var plumber  = require('gulp-plumber');
var util     = require('gulp-util');
var imagemin = require('gulp-imagemin');

// Error handler
var onError = function (err) {
  util.beep();
  util.log(util.colors.yellow(err.message));
};

// Generate HTML from PUG (Jade)
// If Pug is not necessary, 
gulp.task('html', function() {
  return gulp.src('app/**/*.pug')
    .pipe(plumber({ errorHandler: onError }))
    .pipe(changed('build', {extension:'.html'}))
    .pipe(pug())
    .pipe(gulp.dest('build'))
    .pipe(connect.reload());
})

// Process Javascript
gulp.task('js', function() {
  return gulp.src('app/**/*.js')
    .pipe(plumber({ errorHandler: onError }))
    .pipe(changed('build', {extension:'.js'}))
    .pipe(babel())
    .pipe(gulp.dest('build'))
    .pipe(size())
    .pipe(connect.reload());
})

// Load Vue.js from node module
// TODO: consider change to vendor, js/libs or even
//       add as source on js task
gulp.task('vue', function() {
  return gulp.src('node_modules/vue/dist/vue.js')
    .pipe(gulp.dest('build/js'));
})

// Process CSS
gulp.task('scss', function() {
  return gulp.src('app/**/*.scss')
    .pipe(plumber({ errorHandler: onError }))
    .pipe(changed('build', {extension:'.css'}))
    .pipe(sass())
    .pipe(gulp.dest('build/css'))
    .pipe(connect.reload());
})

// Load Bulma css framework from node module
// Note: it will load both bulma.css and bulma.css.map
// TODO: consider add to Process CSS or change to 
//       css/libs css/vendor
gulp.task('bulma', function() {
  return gulp.src('node_modules/bulma/css/bulma.*')
    .pipe(gulp.dest('build/css'));
})

// Process Images
gulp.task('images', function() {
  return gulp.src('app/images/**/*')
    .pipe(plumber({ errorHandler: onError }))
    .pipe(imagemin({
      progressive: true,
      interlaced: true
    }))
    .pipe(gulp.dest('build/images'))
    .pipe(size({title: 'images'}));
})

// Development server setup 
gulp.task('watch', function() {
  gulp.watch('app/**/*.pug', ['html']);
  gulp.watch('app/**/*.js', ['js']);
  gulp.watch('app/**/*.scss', ['scss']);
  gulp.watch('app/images/**/*', ['images']);  
})

gulp.task('connect', function() {
  connect.server({
    host:'guaraproject.com',
    port:3000,
    root:['build'],
    livereload:true
  });
})

// build the solution
gulp.task('default', ['html', 'js', 'vue', 'scss', 'bulma', 'images']);

// open server for development
gulp.task('serve', ['html', 'js', 'vue', 'scss', 'bulma', 'images', 'watch', 'connect']);

