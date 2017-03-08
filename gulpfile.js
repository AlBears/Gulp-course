var gulp = require('gulp'),
    $ = require('gulp-load-plugins')();

gulp.task("dev:styles", styles(false));
gulp.task("dev:scripts", devScripts);

gulp.task('prod:styles', styles(true))

gulp.task('default',
    gulp.parallel
    (
      'dev:styles',
      devScripts
    )
  );

function styles(isProduction) {
  return () => {
  return gulp
      .src('./src/styles/site.less')
      .pipe($.if(!isProduction, $.sourcemaps.init()))
      .pipe($.less())
      .pipe($.autoprefixer({
        browsers: ['last 2 versions']
      }))
      .pipe($.if(isProduction, $.minifyCss()))
      .pipe($.if(!isProduction, $.sourcemaps.write()))
      .pipe(gulp.dest('./public/styles'));
    }
}

function devScripts() {
  return gulp
      .src('./src/scripts/**/*.js')
      .pipe($.sourcemaps.init())
      .pipe($.babel())
      .pipe($.sourcemaps.write('.'))
      .pipe(gulp.dest('./public/scripts'));
}
