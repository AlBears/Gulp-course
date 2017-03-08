var gulp = require('gulp'),
    rimraf = require('rimraf'),
    $ = require('gulp-load-plugins')();

const config = {
  styles: {
    src: ['./src/styles/site.less'],
    dest: './public/styles/',
    autoprefix: ['last 2 versions'],
    srcDirectory: ['./src/styles/**/*.{less, css}']
  },

  scripts: {
    src: ['./src/scripts/**/*.js'],
    dest: './public/scripts',
    bundle: 'app.js'
  }
}

gulp.task("dev:styles", styles(false));
gulp.task("dev:scripts", devScripts);

gulp.task('clean:public', cb => rimraf(config.scripts.dest, cb));

gulp.task('dev', gulp.parallel('dev:styles', 'dev:scripts'));
gulp.task('dev:watch', gulp.series('dev', devWatch));

gulp.task('prod:styles', styles(true));
gulp.task('prod:scripts', gulp.series('clean:public', prodScripts));

gulp.task('prod', gulp.parallel('prod:styles', 'prod:scripts'));

gulp.task('default', gulp.series('dev'));

function devWatch() {
  $.livereload.listen();

  gulp.watch(config.styles.srcDirectory, gulp.series('dev:styles'));
  gulp.watch(config.scripts.src, gulp.series('dev:scripts'));
}

function styles(isProduction) {
  return () => {
  return gulp
      .src(config.styles.src)
      .pipe($.if(!isProduction, $.sourcemaps.init()))
      .pipe($.less())
      .pipe($.autoprefixer({
        browsers: config.styles.autoprefix
      }))
      .pipe($.if(isProduction, $.minifyCss()))
      .pipe($.if(!isProduction, $.sourcemaps.write()))
      .pipe(gulp.dest(config.styles.dest))
      .pipe($.livereload());
    }
}

function devScripts() {
  return gulp
      .src(config.scripts.src)
      .pipe($.sourcemaps.init())
      .pipe($.babel())
      .pipe($.sourcemaps.write('.'))
      .pipe(gulp.dest(config.scripts.dest));
}

function prodScripts() {
  return gulp
      .src(config.scripts.src)
      .pipe($.babel())
      .pipe($.concat(config.scripts.bundle))
      .pipe($.uglify())
      .pipe(gulp.dest(config.scripts.dest));
}
