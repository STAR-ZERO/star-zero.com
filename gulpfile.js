var gulp = require('gulp');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var minifyCss = require('gulp-minify-css');
var del = require('del');
var rename = require("gulp-rename");
var webserver = require('gulp-webserver');

var paths = {
  js: ['src/js/**/*.js'],
  css: ['src/css/**/*.css']
};

gulp.task('clean:js', function() {
  return del(['dist/js']);
});

gulp.task('clean:css', function() {
  return del(['dist/css']);
});

gulp.task('clean', ['clean:js, clean:css']);

gulp.task('js', ['clean:js'], function() {
  return gulp.src(paths.js)
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/js'));
});

gulp.task('css', ['clean:css'], function() {
  gulp.src(paths.css)
    .pipe(sourcemaps.init())
    .pipe(minifyCss())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/css'));
});

gulp.task('webserver', function() {
  gulp.src('./')
    .pipe(webserver({
      livereload: {
        enable: true,
        filter: function(fileName) {
          return !fileName.match(/.src$/)
        }
      },
      open: true
    }));
});

gulp.task('watch', function() {
  gulp.watch(paths.js, ['js']);
  gulp.watch(paths.css, ['css']);
});

gulp.task('develop', ['webserver', 'watch']);

gulp.task('default', ['js', 'css']);
