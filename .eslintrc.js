module.exports = {
  root: true,
  env: {
    webextensions: true,
    es2021: true,
    browser: true,
    node: true,
    'jest/globals': true,
  },
  extends: [
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:react/jsx-runtime',
    'plugin:@typescript-eslint/recommended',
    'plugin:storybook/recommended',
    'prettier',
  ],
  settings: {
    react: {
      version: 'detect',
    },
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', 'jest', '@typescript-eslint'],
  rules: {
    'linebreak-style': ['error', 'unix'],
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        vars: 'all',
        args: 'after-used',
        ignoreRestSiblings: false,
        argsIgnorePattern: '^_',
      },
    ],
    'arrow-body-style': 'off',
    'import/extensions': 'off',
    // 'object-curly-spacing': ['error', 'always'],
    'react/prop-types': 0,
    'react/jsx-curly-brace-presence': ['error'],
  },
};
