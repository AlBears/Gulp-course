var gulp = require('gulp'),
    // babel = require('gulp-babel'),
    // less = require('gulp-less'),
    // sourcemaps = require('gulp-sourcemaps'),
    // autoprefixer = require('gulp-autoprefixer');
    $ = require('gulp-load-plugins')();

gulp.task("dev:styles", devStyles);
gulp.task("dev:scripts", devScripts);

gulp.task('default',
  gulp.series
  (
    clean,
    gulp.parallel
    (
      devStyles,
      devScripts
    ),
    publish
    )
  );

function devStyles(c) {
  return gulp
      .src('./src/styles/site.less')
      .pipe($.sourcemaps.init())
      .pipe($.less())
      .pipe($.autoprefixer({
        browsers: ['last 2 versions']
      }))
      .pipe($.sourcemaps.write())
      .pipe(gulp.dest('./public/styles'));
}

function devScripts() {
  return gulp
      .src('./src/scripts/**/*.js')
      .pipe($.sourcemaps.init())
      .pipe($.babel())
      .pipe($.sourcemaps.write('.'))
      .pipe(gulp.dest('./public/scripts'));
}

function clean(c) {
  setTimeout(() => {
    console.log('CLEANED');
    c();
  }, 1000);
}

function publish(c) {
  setTimeout(() => {
    console.log('PUBLISHED');
    c();
  }, 1000);
}
