var gulp = require('gulp'),
    babel = require('gulp-babel'),
    less = require('gulp-less');

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
      .pipe(less())
      .pipe(gulp.dest('./public/styles'));
}

function devScripts() {
  return gulp
      .src('./src/scripts/**/*.js')
      .pipe(babel())
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
