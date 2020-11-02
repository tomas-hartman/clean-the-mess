module.exports = {
	'env': {
		'webextensions': true,
		'es2021': true,
		'browser': true,
		'node': true,
		'jest/globals': true
	},
	'extends': 'eslint:recommended',
	'parserOptions': {
		'ecmaVersion': 12,
		'sourceType': 'module'
	},
	'plugins': ['jest'],
	'rules': {
		'indent': [
			'error',
			'tab'
		],
		'linebreak-style': [
			'error',
			'unix'
		],
		'quotes': [
			'error',
			'single'
		],
		'semi': [
			'error',
			'always'
		],
		'no-unused-vars': ['error', { 'vars': 'all', 'args': 'after-used', 'ignoreRestSiblings': false, 'argsIgnorePattern': '^_'  }]

	}
};
