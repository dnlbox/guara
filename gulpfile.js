"use strict";

var gulp    = require('gulp');
var connect = require('gulp-connect');
var jade    = require('gulp-jade');
var changed = require('gulp-changed');

gulp.task('jade', function() {
  return gulp.src('src/**/*.jade')
    .pipe(changed('build', {extension:'.html'}))
    .pipe(jade())
    .pipe(gulp.dest('build'))
    .pipe(connect.reload());
})

gulp.task('watch', function() {
  gulp.watch('src/**/*.jade', ['jade']);
})

gulp.task('connect', function() {
  connect.server({
    port:3000,
    root:['build'],
    livereload:true
  });
})

gulp.task('default', ['jade', 'watch', 'connect']);

