"use strict";

var gulp    = require('gulp');
var connect = require('gulp-connect');
var pug     = require('gulp-pug');
var changed = require('gulp-changed');

gulp.task('pug', function() {
  return gulp.src('src/**/*.pug')
    .pipe(changed('build', {extension:'.html'}))
    .pipe(pug())
    .pipe(gulp.dest('build'))
    .pipe(connect.reload());
})

gulp.task('js', function() {
  return gulp.src('src/**/*.js')
    .pipe(changed('build', {extension:'.js'}))
    .pipe(gulp.dest('build'))
    .pipe(connect.reload());
})

gulp.task('vue', function() {
  return gulp.src('bower_components/vue/dist/vue.js')
    .pipe(gulp.dest('build/js'));
})

gulp.task('watch', function() {
  gulp.watch('src/**/*.pug', ['pug']);
  gulp.watch('src/**/*.js', ['js']);
})

gulp.task('connect', function() {
  connect.server({
    port:3000,
    root:['build'],
    livereload:true
  });
})

gulp.task('default', ['pug', 'js', 'vue', 'watch', 'connect']);

