'use strict';

// import plugins
const gulp = require('gulp');
const eslint = require('gulp-eslint');
const browserSync = require('browser-sync');
const gulpIf = require('gulp-if');
const imagemin = require('gulp-imagemin');
const newer = require('gulp-newer');
const size = require('gulp-size');
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cssnano = require('gulp-cssnano');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
// const uglify = require('gulp-uglify');
const useref = require('gulp-useref');
const htmlmin = require('gulp-htmlmin');
const del = require('del');
const workboxBuild = require('workbox-build');
// const {output: pagespeed} = require('psi');

const reload = browserSync.reload;

// Lint javascript
function lint() {
  return gulp.src(['app/scripts/**/*.js', '!node_modules/**'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(gulpIf(!browserSync.active, eslint.failAfterError()));
}

// Optimize images
function images() {
  return gulp.src('app/images/**/*')
    .pipe(newer('dist/images'))
    .pipe(imagemin())
    .pipe(gulp.dest('dist/images'));
}

// Copy all files at the root level (app) 
function copy() {
  return gulp.src([
      'app/*',
      '!app/*.html',
      'node_modules/apache-server-configs/dist/.htaccess'
    ], { dot: true })
    .pipe(gulp.dest('dist'))
    .pipe(size({title: 'copy'}))
}

// Compile and automatically prefix stylesheets
function styles() {
  // TODO: change: add to package.json file
  // see https://github.com/browserslist/browserslist#queries
  const AUTOPREFIXER_BROWSERS = [
    'ie >= 10',
    'ie_mob >= 10',
    'ff >= 30',
    'chrome >= 34',
    'safari >= 7',
    'opera >= 23',
    'ios >= 7',
    'android >= 4.4',
    'bb >= 10'
  ];

  // For best performance, don't add Sass partials to `gulp.src`
  return gulp.src([
    'app/styles/**/*.scss',
    'app/styles/**/*.css'
  ])
    .pipe(newer('.tmp/styles'))
    .pipe(sourcemaps.init())
    .pipe(sass({
      precision: 10
    }).on('error', sass.logError))
    .pipe(autoprefixer(AUTOPREFIXER_BROWSERS))
    .pipe(gulp.dest('.tmp/styles'))
    // Concatenate and minify styles
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(size({title: 'styles'}))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('dist/styles'))
    .pipe(gulp.dest('.tmp/styles'));
}

// Concatenate and minify JavaScript
function scripts() {
    return gulp.src([
      // Note: Since we are not using useref in the scripts build pipeline,
      //       you need to explicitly list your scripts here in the right order
      //       to be correctly concatenated
      './app/scripts/screenfull.js',
      './app/scripts/dialog-polyfill.js',
      './app/scripts/main.js',
      './app/scripts/signin.js',
      './app/scripts/games.js',
      './app/scripts/router.js'
      // Other scripts
    ])
      .pipe(newer('.tmp/scripts'))
      .pipe(sourcemaps.init())
      .pipe(babel())
      .pipe(sourcemaps.write())
      .pipe(gulp.dest('.tmp/scripts'))
      .pipe(concat('main.min.js'))
      // TODO: Do you really want to comment out the line below?
      // .pipe(uglify({preserveComments: 'some'}))

      // Output files
      .pipe(size({title: 'scripts'}))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest('dist/scripts'))
      .pipe(gulp.dest('.tmp/scripts'))
  }

// Scan your HTML for assets & optimize them
function html() {
  return gulp.src('app/**/*.html')
    .pipe(useref({
      searchPath: '{.tmp,app}',
      noAssets: true
    }))

    // Minify any HTML
    .pipe(gulpIf('*.html', htmlmin({
      removeComments: true,
      collapseWhitespace: true,
      collapseBooleanAttributes: true,
      removeAttributeQuotes: true,
      removeRedundantAttributes: true,
      removeEmptyAttributes: true,
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true,
      removeOptionalTags: true
    })))
    // Output files
    .pipe(gulpIf('*.html', size({title: 'html', showFiles: true})))
    .pipe(gulp.dest('dist'));
}

// Clean output directory
function clean(cb) {
  del(['.tmp', 'dist/*', '!dist/.git'], {dot: true});
  cb();
}

// Watch files for changes & reload
function serve(cb) {
  gulp.parallel(scripts, styles);
  browserSync({
    notify: false,
    // Customize the Browsersync console logging prefix
    logPrefix: 'WSK',
    // Allow scroll syncing across breakpoints
    scrollElementMapping: ['main', '.mdl-layout'],
    // Run as an https by uncommenting 'https: true'
    // Note: this uses an unsigned certificate which on first access
    //       will present a certificate warning in the browser.
    // https: true,
    server: ['.tmp', 'app'],
    port: 3000
  });

  gulp.watch(['app/**/*.html'], reload);
  gulp.watch(['app/styles/**/*.{scss,css}'], ['styles', reload]);
  gulp.watch(['app/scripts/**/*.js'], ['lint', 'scripts', reload]);
  gulp.watch(['app/images/**/*'], reload);
  cb();
}

// Build and serve the output from the dist build
function serveDist(cb) {
  build();
  browserSync({
    notify: false,
    logPrefix: 'WSK',
    // Allow scroll syncing across breakpoints
    scrollElementMapping: ['main', '.mdl-layout'],
    // Run as an https by uncommenting 'https: true'
    // Note: this uses an unsigned certificate which on first access
    //       will present a certificate warning in the browser.
    // https: true,
    server: 'dist',
    port: 3001
  });
  cb();
}

// // Run PageSpeed Insights
// gulp.task('pagespeed', cb =>
//   // Update the below URL to the public URL of your site
//   pagespeed('example.com', {
//     strategy: 'mobile'
//     // By default we use the PageSpeed Insights free (no API key) tier.
//     // Use a Google Developer API key if you have one: http://goo.gl/RkN0vE
//     // key: 'YOUR_API_KEY'
//   }, cb)
// );

// // Copy over the scripts that are used in importScripts as part of the generate-service-worker task.
// gulp.task('copy-sw-scripts', () => {
//   return gulp.src(['node_modules/sw-toolbox/sw-toolbox.js',
//     'app/scripts/sw/runtime-caching.js']).pipe(gulp.dest('dist/scripts/sw'));
// });

// // See http://www.html5rocks.com/en/tutorials/service-worker/introduction/ for
// // an in-depth explanation of what service workers are and why you should care.
// // Generate a service worker file that will provide offline functionality for
// // local resources. This should only be done for the 'dist' directory, to allow
// // live reload to work as expected when serving from the 'app' directory.
// gulp.task('generate-service-worker', ['copy-sw-scripts'], () => {
//   const rootDir = 'dist';
//   const filepath = path.join(rootDir, 'service-worker.js');

//   return swPrecache.write(filepath, {
//     // Used to avoid cache conflicts when serving on localhost.
//     cacheId: pkg.name || 'web-starter-kit',
//     // sw-toolbox.js needs to be listed first. It sets up methods used in runtime-caching.js.
//     importScripts: [
//       'scripts/sw/sw-toolbox.js',
//       'scripts/sw/runtime-caching.js'
//     ],
//     staticFileGlobs: [
//       // Add/remove glob patterns to match your directory setup.
//       `${rootDir}/images/**/*`,
//       `${rootDir}/scripts/**/*.js`,
//       `${rootDir}/styles/**/*.css`,
//       `${rootDir}/*.{html,json}`
//     ],
//     // Translates a static file path to the relative URL that it's served from.
//     // This is '/' rather than path.sep because the paths returned from
//     // glob always use '/'.
//     stripPrefix: rootDir + '/'
//   });
// });

function generateServiceWorker() {
  return workboxBuild.generateSW({
    globDirectory: 'dist',
    globPatterns: [
      '**/*.{html,json,js,css}',
    ],
    swDest: 'dist/service-worker.js',
    cacheId: 'cwwf'
  });
}
// Load custom tasks from the `tasks` directory
// Run: `npm install --save-dev require-dir` from the command-line
// try { require('require-dir')('tasks'); } catch (err) { console.error(err); }

// define complex tasks
const build = gulp.series(
  clean,
  styles,
  gulp.parallel(
    lint, html, scripts, images, copy
  ),
  generateServiceWorker
);
// // Build production files, the default task
// gulp.task('default', ['clean'], cb =>
//   runSequence(
//     'styles',
//     ['lint', 'html', 'scripts', 'images', 'copy'],
//     'generate-service-worker',
//     cb
//   )
// );


// export tasks
exports.default = build;
exports.serve = serve;
exports.serveDist = serveDist;
