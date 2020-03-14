const { src, watch, dest, series } = require('gulp');

// Importing Gulp Plugins.
const sass      = require('gulp-sass');
const uglifycss = require('gulp-uglifycss');
const rename    = require("gulp-rename");
const terser    = require('gulp-terser');
const sync      = require('browser-sync').create();
const babel     = require('gulp-babel');
const plumber   = require('gulp-plumber');
const concat    = require('gulp-concat');

// for SCSS to CSS
const scssToCss = (cb) => {
    // where is file
  return src('./scss/*.scss')
    // pass file through the sass compiler
    .pipe(sass().on('error', sass.logError))
    .pipe(rename('style.min.css'))
    .pipe(uglifycss({
      "uglyComments": true
    }))
    // where Do I save
    .pipe(dest('./dist/'))
    // stream change all browsers
    .pipe(sync.stream())

    cb();
}

// for CSS to Min.CSS

const uglifyCss = () => {
    return src('./css/*.css')
    .pipe(rename('style.min.css'))
    .pipe(uglifycss({
        "uglyComments": true
    }))
    .pipe(dest('./dist/'))
    .pipe(sync.stream())
}


// babel

const transfiler = (cb) => {
  return src('./js/*.js')
  .pipe(plumber())          // error handler
  .pipe(concat('main.js')) // concat the files
  .pipe(babel({
    "presets": ["@babel/env"]
  }))            // babel
  .pipe(terser())         // ugliy
  .pipe(rename('main.min.js')) // file rename
  .pipe(dest('./dist/'))      // outup
  .pipe(sync.stream()         ) // reload the browser
}


// for js to minified

// const js = (cb) => {
//     return src('./js/main.js')
//     .pipe(rename('main.min.js'))
//     .pipe(terser())
//     .pipe(dest('./dist/'))
// }

const watchDir = (cb) => {
    sync.init({
        server: {
            baseDir: './dist/'
        }
    });

    watch('./scss/*.scss', scssToCss)
    watch('./js/*.js', transfiler)
    watch('./dist/*.html').on('change', sync.reload);
}

exports.default = watchDir;
