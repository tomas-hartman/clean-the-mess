module.exports = {
  env: {
    webextensions: true,
    es2021: true,
    browser: true,
    node: true,
    'jest/globals': true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react', 'jest',
  ],
  rules: {
    'linebreak-style': [
      'error',
      'unix',
    ],
    'no-unused-vars': ['error', {
      vars: 'all', args: 'after-used', ignoreRestSiblings: false, argsIgnorePattern: '^_',
    }],
    'arrow-body-style': 'off',
    'react/prop-types': 0,
  },
};
