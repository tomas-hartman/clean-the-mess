const { watch, src, dest } = require('gulp');
const { argv } = require('yargs');
const merge = require('gulp-merge-json');
const template = require('gulp-template-html');
const rename = require('gulp-rename');
const clean = require('gulp-clean');

function cleanDir(dir) {
  console.log(dir);

  return src(dir, { read: false, allowEmpty: true })
    .pipe(clean());
}

function html(browser, tempDir) {
  return src(`src/popup/popup.${browser}.html`)
    .pipe(template('src/popup/popup.common.html'))
    .pipe(rename('popup.html'))
    .pipe(dest(`${tempDir}/popup`));
}

/**
 * Generate manifest.json from chunks
 */
function manifest(browser, tempDir) {
  const options = {
    fileName: 'manifest.json',
  };

  return src(['src/manifest.common.json', `src/manifest.${browser}.json`])
    .pipe(merge(options))
    .pipe(dest(tempDir));
}

/**
 * Copy common (shared) source files to temp dir in dist
 *
 * I need to handle manifest and popup.html manually
 * I don't need to copy _dev dir
 */
function common(tempDir, cb) {
  const exceptions = ['!src/_dev/', '!src/_icons/unused', '!src/manifest.json', '!src/popup/popup.html'];

  src(['src/**/*', ...exceptions])
    .pipe(dest(tempDir));

  cb();
}

/**
 * DEV FLOW
 */

/**
 * Compiles popup.html and manifest.json
 * @param {string} browser
 * @param {function} cb
 */
function prebundle(browser, cb, _distDir) {
  const distDir = _distDir || 'src/';

  manifest(browser, distDir);
  html(browser, distDir);

  cb();
}

/**
 * Runs development/watch mode
 * Can only be run for either chrome or firefox, because it generates manifest.json
 * directly in src dir.
 *
 * @param {function} cb
 */
exports.dev = function (cb) {
  const { b: browser } = argv;
  const browsers = ['chrome', 'firefox'];

  if (!browser || !browsers.includes(browser)) {
    throw new Error('Specify browser by calling this task with param -b browser_name.');
  }
  const distDir = `dist/${browser}`;
  cleanDir(distDir, cb);

  prebundle(browser, cb);
  watch(['src/manifest.*.json', 'src/popup/popup.*.html'], prebundle);
};

/**
 * Perpares build for production version
 * Copy src to dist .chrome-temp
 * Compile manifest and html on the way
 * build project from .chrome-temp to chrome
 * delete .chrome-temp
 */
exports.prebuild = function (cb) {
  const { b: browser } = argv;
  const browsers = ['chrome', 'firefox'];

  if (!browser || !browsers.includes(browser)) {
    throw new Error('Specify browser variable. Check if param -b browser_name is provided or BROWSER=browser is set.');
  }

  const tempDir = `dist/.${browser}-temp`;
  const distDir = `dist/${browser}`;

  /** Clean previous builds */
  // cleanDir(tempDir, cb);
  cleanDir(distDir, cb);

  /** Copy src to dist .browser-temp */
  common(tempDir, cb);

  /** Compile manifest and html in .browser-temp */
  prebundle(browser, cb, tempDir);

  cb();
};
