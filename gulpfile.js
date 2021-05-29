const {
  watch, src, dest, parallel,
} = require('gulp');
const merge = require('gulp-merge-json');
const sass = require('gulp-sass');
const fs = require('fs');
const path = require('path');
const exec = require('gulp-exec');

const express = require('express');
const livereload = require('livereload');
const connectLivereload = require('connect-livereload');

sass.compiler = require('node-sass');

const ignoredPatternsInCompilation = ['!src/icons/**', '!src/styles/**/*', '!src/dev/**/*', '!src/*.json'];

/**
 * Build single tasks
 */
function common(browser) {
  const ignoredChromeOnly = ['!src/content/themedIco.chrome.js'];
  const ignoredFirefoxOnly = [];

  const browserSpecific = browser === 'firefox' ? ignoredChromeOnly : ignoredFirefoxOnly;

  // copy everything that is not js
  return src(['src/**/*', '!src/**/*.jsx', ...ignoredPatternsInCompilation, ...browserSpecific])
    .pipe(dest(`dist/${browser}/`));
}

/**
 * Build js
 * @param {*} browser
 * @returns
 */
function compileJsx(browser, isProduction) {
  const reportOptions = {
    err: true, // default = true, false means don't write err
    stderr: true, // default = true, false means don't write stderr
    stdout: true, // default = true, false means don't write stdout
  };

  // compiles all js(x) files except for those with distinct files and dev folders
  /**
   * @todo Here needs to be path to the main entrypoint!
   */
  return src(['src/popup/*.jsx', ...ignoredPatternsInCompilation])
    .pipe(exec((file) => {
      const destination = `--dist-dir dist/${browser}/popup/`;

      if (isProduction) return `npx parcel build ${file.path} --no-cache ${destination}`;
      return `npx parcel ${file.path} ${destination}`;
    }))
    .pipe(exec.reporter(reportOptions))
    .pipe(dest(`dist/${browser}/`));
}

function manifest(browser) {
  const options = {
    fileName: 'manifest.json',
  };

  src(['src/manifest.common.json', `src/manifest.${browser}.json`])
    .pipe(merge(options))
    .pipe(dest(`./dist/${browser}/`));
}

function styles(browser, { srcPath: _srcPath, destPath: _destPath, isProduction }) {
  const srcPath = _srcPath || 'src/styles/**/*.scss';
  const destPath = _destPath || `dist/${browser}/styles/`;

  const devOptions = browser ? { includePaths: `src/styles/${browser}/` } : {};
  const prodOptions = {
    outputStyle: 'compressed',
    includePaths: `src/styles/${browser}/`,
  };

  const options = isProduction ? prodOptions : devOptions;

  return src(srcPath)
    // .pipe(sass(options).on('error', sass.logError))
    .pipe(sass(options).on('error', sass.logError))
    .pipe(dest(destPath));
}

function icons(browser) {
  return src(['src/icons/**/*.*', '!src/icons/unused/**']).pipe(dest(`dist/${browser}/icons`));
}

function server() {
  const app = express();
  const port = 3000;

  const liveReloadServer = livereload.createServer();
  liveReloadServer.watch('src/dev/style-dev');

  app.use(connectLivereload());

  const publicPath = express.static(path.join(__dirname, 'src/dev/style-dev'));
  const publicImages = express.static(path.join(__dirname, 'src/dev/style-dev', '../../icons/'));

  app.use(publicPath);
  app.use('/icons', publicImages);

  app.listen(port, () => {
    console.log(`Started localhost on port ${port}`);
  });
}

function compileScssDev(cb) {
  const styleDevPath = 'src/dev/style-dev';
  const styleDevSrcPath = 'src/dev/style-dev/**/*.scss';

  styles(null, { srcPath: styleDevSrcPath, destPath: styleDevPath });
  cb();
}

function cleanUp(cb, browser, _options) {
  console.log('Cleaning after previous jobs.');
  const pathToClean = path.join(__dirname, `dist/${browser}`);

  fs.rmdir(pathToClean, { recursive: true }, cb);

  cb();
}

/**
 * Joint function
 */
function build(browser) {
  const isProduction = process.env.NODE_ENV === 'production';

  styles(browser, { isProduction });
  icons(browser);
  manifest(browser);
  common(browser);
  compileJsx(browser, isProduction);
}

/**
 * Environment building
 */
function buildFirefox(cb) {
  build('firefox');

  cb();
}

function buildChrome(cb) {
  build('chrome');

  cb();
}

/**
 * Tasks
 */
exports.build = function (cb) {
  cleanUp(cb, 'firefox');
  cleanUp(cb, 'chrome');

  buildFirefox(cb);
  buildChrome(cb);
};

exports.styledev = function () {
  server();

  watch('./src/dev/style-dev/**/*.scss', compileScssDev);
};

exports.firefox = function (cb) {
  cleanUp(cb, 'firefox');
  buildFirefox(cb);

  console.log('Waiting for changes...');
  // add some cleanup
  watch(['src/', '!src/dev/'], buildFirefox);
};

exports.chrome = function (cb) {
  cleanUp(cb, 'chrome');
  buildChrome(cb);

  console.log('Waiting for changes...');
  // add some cleanup
  watch(['src/', '!src/dev/'], buildChrome);
};

exports.default = function () {
  console.log('Waiting for changes...');
  watch(['src/', '!src/dev/'], parallel(buildFirefox, buildChrome));
};
