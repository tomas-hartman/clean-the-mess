const { watch, src, dest, parallel } = require('gulp');
const sass = require('gulp-sass');
const path = require('path');

const express = require('express');
const livereload = require('livereload');
const connectLivereload = require('connect-livereload');

sass.compiler = require('node-sass');

/**
 * Build single tasks
 */
function common(browser) {
	// copy everything except for those with distinct files and dev folders
	return src(['src/**/*', '!src/icons/**', '!src/styles/**', '!src/dev/**']).pipe(dest(`dist/${browser}/`));
}

function styles(browser, _srcPath, _destPath){
	const srcPath = _srcPath || `src/styles/${browser}/**/*.scss`;
	const destPath = _destPath || `dist/${browser}/styles/`;

	return src(srcPath)
		.pipe(sass().on('error', sass.logError))
		.pipe(dest(destPath));
}

function icons(browser) {
	return src(['src/icons/*.*', '!src/icons/unused/**']).pipe(dest(`dist/${browser}/icons`));
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

	styles('', styleDevSrcPath, styleDevPath);
	cb();
}

/**
 * Joint function 
 */
function build(browser){
	styles(browser);
	icons(browser);
	common(browser);
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
exports.build = parallel(buildDevFirefox, buildDevChrome);

exports.styledev = function(){
	server();

	watch('./src/dev/style-dev/**/*.scss', compileScssDev);
};

exports.firefox = function(){
	console.log('Waiting for changes...');
	// add some cleanup
	watch(['src/', '!src/dev/'], buildDevFirefox);
};

exports.chrome = function(){
	console.log('Waiting for changes...');
	// add some cleanup
	watch(['src/', '!src/dev/'], buildDevChrome);
};

exports.default = function(){
	console.log('Waiting for changes...');
	watch(['src/', '!src/dev/'], parallel(buildDevFirefox, buildDevChrome));
};
