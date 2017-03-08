var gulp = require('gulp'),
    $ = require('gulp-load-plugins')();

const config = {
  styles: {
    src: ['./src/styles/site.less'],
    dest: './public/styles/',
    autoprefix: ['last 2 versions']
  },

  scripts: {
    src: ['./src/scripts/**/*.js'],
    dest: './public/scripts',
    bundle: 'app.js'
  }
}

gulp.task("dev:styles", styles(false));
gulp.task("dev:scripts", devScripts);

gulp.task('dev', gulp.parallel('dev:styles', 'dev:scripts'));

gulp.task('prod:styles', styles(true));
gulp.task('prod:scripts', prodScripts);

gulp.task('prod', gulp.parallel('prod:styles', 'prod:scripts'));

gulp.task('default', gulp.series('dev'));

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
      .pipe(gulp.dest(config.styles.dest));
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
