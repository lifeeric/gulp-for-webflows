const gulp = require('gulp');
const sass = require('gulp-sass');
const uglifycss = require('gulp-uglifycss');
const rename = require("gulp-rename");
const terser = require('gulp-terser');
const browserSync = require('browser-sync').create();

// for SCSS to CSS
const style = () => {
    // where is file
  return gulp.src('./scss/*.scss')
    // pass file through the sass compiler
    .pipe(sass().on('error', sass.logError))
    // where Do I save
    .pipe(gulp.dest('./css'))
    // stream change all browsers
    .pipe(browserSync.stream())
}

// for CSS to Min.CSS

const miniCSS = () => {
    return gulp.src('./css/*.css')
    .pipe(rename('style.min.css'))
    .pipe(uglifycss({
        "uglyComments": true
    }))
    .pipe(gulp.dest('./dist/'))
}

// for js to minified

const js = () => {
    return gulp.src('./js/main.js')
    .pipe(rename('main.min.js'))
    .pipe(terser())
    .pipe(gulp.dest('./dist/'))
}

const watch = () => {
    browserSync.init({
        server: {
            baseDir: './dist/'
        }
    });
    
    gulp.watch('./scss/*.scss', style);
    gulp.watch('./css/*.css', miniCSS);
    gulp.watch('./js/*.js', js);
    gulp.watch('./dist/*.html').on('change', browserSync.reload);
    gulp.watch('./js/*.js').on('change', browserSync.reload)
}

exports.default = watch;