import js from '@eslint/js';
import globals from 'globals';
import astro from 'eslint-plugin-astro';
import astroParser from 'astro-eslint-parser';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-config-prettier';

export default [
  {
    ignores: ['dist/', '.astro/', 'node_modules/'],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...astro.configs.recommended,
  // Ensure TypeScript syntax in Astro frontmatter (e.g. `type Props = {}`) parses correctly.
  {
    files: ['**/*.astro'],
    languageOptions: {
      parser: astroParser,
      parserOptions: {
        // Parse <script> and frontmatter blocks with the TypeScript parser.
        parser: tseslint.parser,
        extraFileExtensions: ['.astro'],
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
  },
  prettier,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      'no-console': 'off',
    },
  },
];
