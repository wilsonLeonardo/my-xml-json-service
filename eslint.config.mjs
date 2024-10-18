import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

export default [
  { files: ['**/*.{ts}'] },
  { languageOptions: { globals: globals.browser, parser: '@typescript-eslint/parser' } },
  {
    rules: {
      'prettier/prettier': 'warn',
      'max-len': ['warn', 120],
    },
  },
  { ignores: ['jest.config.js', 'coverage/*'] },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  eslintPluginPrettierRecommended,
];
