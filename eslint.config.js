import js from '@eslint/js';
import globals from 'globals';
import astro from 'eslint-plugin-astro';
import astroParser from 'astro-eslint-parser';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-config-prettier';
import reactHooks from 'eslint-plugin-react-hooks';

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
      // Catch common mistakes
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
      // Enforce consistent return types
      '@typescript-eslint/explicit-function-return-type': 'off',
      // Prefer const over let when variable is not reassigned
      'prefer-const': 'warn',
      // No floating promises (forgotten await)
      '@typescript-eslint/no-floating-promises': 'off',
      // Enforce type imports
      '@typescript-eslint/consistent-type-imports': [
        'warn',
        { prefer: 'type-imports', fixStyle: 'inline-type-imports' },
      ],
      // Avoid non-null assertions where possible (but don't error)
      '@typescript-eslint/no-non-null-assertion': 'off',
    },
  },
  // React-specific rules for TSX files
  {
    files: ['**/*.{jsx,tsx}'],
    plugins: {
      'react-hooks': reactHooks,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      // Too aggressive for typical app code (legitimate to sync state from env/feature flags).
      'react-hooks/set-state-in-effect': 'off',
    },
  },
];
