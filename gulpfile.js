const { watch, src, dest, parallel } = require('gulp');
const sass = require('gulp-sass');

sass.compiler = require('node-sass');

/**
 * Build single tasks
 */
function common(browser) {
	// copy everything except for those with distinct files and dev folders
	return src(['src/**/*', '!src/icons/**', '!src/styles/**', '!src/dev/**']).pipe(dest(`dist/${browser}/`));
}

function styles(browser, _srcPath, _destPath){

	console.log(_srcPath);
	console.log(_destPath);
	
	const srcPath = _srcPath || `src/styles/${browser}/**/*.scss`;
	const destPath = _destPath || `dist/${browser}/styles/`;
	
	console.log(srcPath);
	console.log(destPath);

	return src(srcPath)
		.pipe(sass().on('error', sass.logError))
		.pipe(dest(destPath));
}

function icons(browser) {
	return src(['src/icons/*.*', '!src/icons/unused/**']).pipe(dest(`dist/${browser}/icons`));
}

function server() {
	const express = require('express');
	const livereload = require('livereload');
	const connectLivereload = require('connect-livereload');

	const app = express();
	const port = 3000;

	const liveReloadServer = livereload.createServer();
	liveReloadServer.watch('src/dev/style-dev');

	app.use(connectLivereload());
	app.use(express.static('src/dev/style-dev'));

	app.listen(port, () => {
		console.log(`Started localhost on port ${port}`);
	});
}

function devserver() {
	const styleDevPath = 'src/dev/style-dev';
	const styleDevSrcPath = 'src/dev/style-dev/**/*.scss';

	styles('', styleDevSrcPath, styleDevPath);
	// server();
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
 * Exports
 */
exports.build = parallel(buildDevFirefox, buildDevChrome);
// exports.devserver = devserver;
exports.devserver = function(){
	server();
	// devserver();

	watch('./src/dev/style-dev', devserver);
};

exports.firefox = function(){
	console.log('Waiting for changes...');
	// add some cleanup
	watch(['src/', '!src/dev/'], buildDevFirefox);
};

exports.chrome = function(){
	console.log('Waiting for changes...');
	// add some cleanup
	watch('src/', buildDevChrome);
};

exports.default = function(){
	console.log('Waiting for changes...');
	watch(['src/', '!src/dev/'], parallel(buildDevFirefox, buildDevChrome));
};


