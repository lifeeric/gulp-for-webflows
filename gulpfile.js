const { src, watch, dest, series } = require('gulp');

// Webpack Config
const webpack   = require('webpack');
const webConfig = require('./config/webpack.config.js');

// Importing Gulp Plugins.
const sass      = require('gulp-sass');
const uglifycss = require('gulp-uglifycss');
const rename    = require("gulp-rename");
const sync      = require('browser-sync').create();




/* ***            Scripting       *****/
// For Scss to CSS
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


// For weback

const webpackAssests = (cb) => {
  return new Promise((resolve, reject) => {
    webpack(webConfig, (err, stats) => {
      if ( err ) {
        return reject(err)
      }
      if( stats.hasErrors() ) {
        return reject(new Error(stats.compilation.errors.join('\n')))
      }
      resolve();
    })
  })
}

// Watching & server
const watchDir = (cb) => {
    sync.init({
        server: {
            baseDir: './dist/'
        }
    });

    watch('./scss/*.scss', scssToCss);
    watch('./js/*.js', webpackAssests).on('change', sync.reload);
    // watch('./js/*.js', transfiler)
    watch('./dist/*.html').on('change', sync.reload);
}

exports.default = watchDir;
exports.build = webpackAssests;