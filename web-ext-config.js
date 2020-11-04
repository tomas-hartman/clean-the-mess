module.exports = {
	verbose: false,
	artifactsDir: './build',
	sourceDir: './src',
	ignoreFiles: [
		'./dev',
		'./icons/unused',
	],
	run: {
		/**
		 * Urls that should be opened at start - there will be lots of them
		 */
		startUrl: [
			'www.mozilla.com',
			'developer.mozilla.org'
		]
	}
};