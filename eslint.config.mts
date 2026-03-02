import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import { defineConfig, globalIgnores } from 'eslint/config';
import storybook from 'eslint-plugin-storybook';
import eslintConfigPrettier from 'eslint-config-prettier/flat';
import jestPlugin from 'eslint-plugin-jest';

export default defineConfig([
  globalIgnores([
    'node_modules/**',
    '**/dist/**',
    '**/.parcel-cache/**',
    '**/search-dev/input-data*'
  ]),
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    plugins: {
      js,
      react: pluginReact,
    },
    extends: ['js/recommended'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
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
      'react/prop-types': 0,
      'react/jsx-curly-brace-presence': ['error'],

    },
  },
  {
    settings: {
      react: {
        version: 'detect',
      },
    },
  },

  tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  pluginReact.configs.flat['jsx-runtime'],
  reactHooksPlugin.configs.flat['recommended-latest'],
  ...storybook.configs['flat/recommended'],
  {
    rules: { "storybook/no-renderer-packages": "off", }
  },
  {
    ...jestPlugin.configs['flat/recommended'],
    files: ['tests/**/*.{ts,js}', '**/*.test.{ts,js}', '**/*.spec.{ts,js}'],
  },

  // Prettier — must be last to override formatting rules
  eslintConfigPrettier,
]);
