const {
  watch, src, dest, parallel,
} = require('gulp');

const { exec: execNode } = require('child_process');
const del = require('del');
const merge = require('gulp-merge-json');
const template = require('gulp-template-html');
const rename = require('gulp-rename');

function cleanTemp(tempDir, cb) {
  console.log(tempDir);

  del(tempDir, { force: true });
  cb();
}

function bundle(browser, cb) {
//   const destDir = `dist/${browser}`;

  execNode(`npm run build:${browser}`);

  const tempDir = `dist/.${browser}-temp`;
  cleanTemp(tempDir, cb);
  cb();
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
function common(tempDir) {
  const exceptions = ['!src/manifest*.json', '!src/popup/popup*.html', '!src/_dev/'];

  return src(['src/**/*', ...exceptions])
    .pipe(dest(tempDir));
}

function build(cb, browser) {
  const tempDir = `dist/.${browser}-temp`;

  common(tempDir);
  manifest(browser, tempDir);
  html(browser, tempDir);

  bundle(browser, cb);

  cleanTemp(tempDir, cb);

  cb();
}

exports.firefox = function (cb) {
  /**
     * Copy src to dist .chrome-temp
     * Compile manifest and html on the way
     * build project from .chrome-temp to chrome
     * delete .chrome-temp
     */
  build(cb, 'firefox');

  console.log('Waiting for changes...');
  // add some cleanup
//   watch(['src/', '!src/dev/'], buildFirefox);
};

exports.chrome = function (cb) {
  /**
     * Copy src to dist .chrome-temp
     * Compile manifest and html on the way
     * build project from .chrome-temp to chrome
     * delete .chrome-temp
     */
  build(cb, 'chrome');

  console.log('Waiting for changes...');
};

function bundleBrowserDependent(cb) {
  const distDir = 'src/';
  const browser = 'chrome';

  manifest(browser, distDir);
  html(browser, distDir);

  cb();
}

exports.devChrome = function (cb) {
  /**
       * Copy src to dist .chrome-temp
       * Compile manifest and html on the way
       * build project from .chrome-temp to chrome
       * delete .chrome-temp
       */

  const browser = 'chrome';

  bundleBrowserDependent(cb);

  //   cb();

  watch(['src/manifest.*.json', 'src/popup/popup.*.html'], bundleBrowserDependent);

  console.log('Waiting for changes...');
};
