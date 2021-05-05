const { watch, src, dest, parallel } = require('gulp');
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
function compileJsx(browser) {
  // compiles all js(x) files except for those with distinct files and dev folders
  return src(['src/**/*.jsx', ...ignoredPatternsInCompilation])
    .pipe(exec((file) => `npx parcel ${file.path} --dist-dir dist/${browser}/popup/`))
    .pipe(dest(`dist/${browser}/`));
}


// .pipe(exec(file => `git checkout ${file.path} customTemplatingThing`, options))

function manifest(browser) {
  const options = {
    fileName: 'manifest.json',
  };

  src(['src/manifest.common.json', `src/manifest.${browser}.json`])
    .pipe(merge(options))
    .pipe(dest(`./dist/${browser}/`));
}

function styles(browser, _srcPath, _destPath){
  const srcPath = _srcPath || 'src/styles/**/*.scss';
  const destPath = _destPath || `dist/${browser}/styles/`;

  const options = browser ? {includePaths: `src/styles/${browser}/`} : {};

  return src(srcPath)
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

  styles(null, styleDevSrcPath, styleDevPath);
  cb();
}

function cleanUp(cb, browser, _options) {
  console.log('Cleaning after previous jobs.');
  const pathToClean = path.join(__dirname, `dist/${browser}`);
	
  fs.rmdir(pathToClean, {recursive: true}, cb);

  cb();
}

/**
 * Joint function 
 */
function build(browser){
  styles(browser);
  icons(browser);
  manifest(browser);
  common(browser);
  compileJsx(browser);
}

/**
 * Environment building
 */
function buildDevFirefox(cb) {
  build('firefox');
    
  cb();
}

function buildDevChrome(cb) {
  build('chrome');
    
  cb();
}

/**
 * Tasks
 */
exports.build = function(cb) {
  cleanUp(cb, 'firefox');
  cleanUp(cb, 'chrome');

  buildDevFirefox(cb);
  buildDevChrome(cb);
};


exports.styledev = function(){
  server();

  watch('./src/dev/style-dev/**/*.scss', compileScssDev);
};

exports.firefox = function(cb){
  cleanUp(cb, 'firefox');
  buildDevFirefox(cb);

  console.log('Waiting for changes...');
  // add some cleanup
  watch(['src/', '!src/dev/'], buildDevFirefox);
};

exports.chrome = function(cb){
  cleanUp(cb, 'chrome');
  buildDevChrome(cb);
	
  console.log('Waiting for changes...');
  // add some cleanup
  watch(['src/', '!src/dev/'], buildDevChrome);
};

exports.default = function(){
  console.log('Waiting for changes...');
  watch(['src/', '!src/dev/'], parallel(buildDevFirefox, buildDevChrome));
};
