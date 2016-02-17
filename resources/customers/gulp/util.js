

var config = require('./config');
var gulp = require('gulp');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
var gutil = require('gulp-util');
var concat = require('gulp-concat');
var templateCache = require('gulp-angular-templatecache');
var sass = require('gulp-sass');
var insert = require('gulp-insert');
var filter = require('gulp-filter');
var ngAnnotate = require('gulp-ng-annotate');
var gulpif = require('gulp-if');
var uglify = require('gulp-uglify');
var constants = require('./const');
var IS_DEV = constants.IS_DEV;
var utils = require('../scripts/gulp-utils.js');
var loopbackAngular = require('gulp-loopback-sdk-angular');
exports.buildJs = buildJs;
exports.buildHtml = buildHtml;
exports.buildScss = buildScss;
exports.buildLoopback = buildLoopback;
/**
 * Builds the entire component library javascript.
 * @param {boolean} isRelease Whether to build in release mode.
 */
function buildJs () {

  gutil.log("building js files...");	

  var jsBuildStream = gulp.src(config.jsFiles)
		.pipe(ngAnnotate())
	  .pipe(filterNonCodeFiles())
	  .pipe(utils.addJsWrapper(true))
    .pipe(insert.prepend(config.banner))
	  .pipe(concat('app.js'))
	  .pipe(gulp.dest(config.outputDir))
	  .pipe(gulpif(!IS_DEV, uglify({ preserveComments: 'some' })))
    .pipe(rename({ extname: '.min.js' }))
    .pipe(gulp.dest(config.outputDir));
}

function buildLoopback() {
  return gulp.src('../server/server.js')
    .pipe(loopbackAngular())
    .pipe(rename('lb-services.js'))
    .pipe(gulp.dest(config.outputDir));
}

/**
 * Builds the entire template cache html.
 * @param {boolean} isRelease Whether to build in release mode.
 */
function buildHtml() {

  gutil.log("building template cache html files...");	

  var htmlBuildStream = gulp.src(config.htmlFiles)
     .pipe(templateCache())
     .pipe(gulp.dest(config.outputDir));
}

/**
 * Builds the entire compass style sass.
 * @param {boolean} isRelease Whether to build in release mode.
 */
function buildScss() {

  gutil.log("building scss style files...");	

  var scssBuildStream = gulp.src(config.scssFiles)
    .pipe(sass())
    .pipe(concat('app.css'))
    .pipe(gulp.dest(config.outputDir));
}


function filterNonCodeFiles() {
  return filter(function(file) {
    return !/demo|module\.json|script\.js|\.spec.js|README/.test(file.path);
  });
}

