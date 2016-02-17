var gulp = require('gulp');

exports.dependencies = ['build-js', 'build-scss', 'build-html'];

exports.task = function() {
  gulp.watch(['src/**/*.js'], ['build-js']);
  gulp.watch(['src/style/*.scss'], ['build-scss']);
  gulp.watch(['web/**/*.html'], ['build-html']);
};