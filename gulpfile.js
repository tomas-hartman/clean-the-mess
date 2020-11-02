const { watch, src, dest, parallel } = require('gulp');

/**
 * Tasks
 */
function manifest(browser) {
	return src('src/*.*').pipe(dest(`dist/${browser}/`));
}

function modules(browser) {
	return src('src/modules/*').pipe(dest(`dist/${browser}/modules`));
}

function styles(browser) {
	return src(`src/styles/${browser}/*.*`).pipe(dest(`dist/${browser}/styles/`));
}

function background(browser) {
	return src('src/background/*.*').pipe(dest(`dist/${browser}/background`));
}

function popup(browser) {
	return src('src/popup/*.*').pipe(dest(`dist/${browser}/popup`));
}

function icons(browser) {
	return src(['src/icons/*.*', '!src/icons/unused/**']).pipe(dest(`dist/${browser}/icons`));
}

/**
 * Joint function 
 */
function browser(name){
	manifest(name);
	modules(name);
	styles(name);
	background(name);
	popup(name);
	icons(name);
}

/**
 * Environment building
 */
function firefoxTask(cb) {
	browser('firefox');
    
	cb();
}

function chromeTask(cb) {
	browser('chrome');
    
	cb();
}

/**
 * Exports
 */
exports.build = parallel(firefoxTask, chromeTask);

exports.firefox = function(){
	watch('src/', firefoxTask);
};

exports.chrome = function(){
	watch('src/', chromeTask);
};

exports.default = function(){
	watch('src/', parallel(firefoxTask, chromeTask));
};