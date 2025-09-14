// eslint.config.mjs
import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import n from 'eslint-plugin-n';
import importX from 'eslint-plugin-import-x';

export default [
  // Ignore build artifacts
  { ignores: ['dist/**', 'node_modules/**'] },

  // Base JS rules
  js.configs.recommended,

  // TypeScript rules (type-aware)
  ...tseslint.configs.recommendedTypeChecked,

  // Node.js best practices (flat config)
  n.configs['flat/recommended'],

  // Import hygiene (flat-friendly)
  importX.configs.recommended,

  {
    files: ['**/*.ts', '**/*.cts'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        // Enable type-aware rules by pointing at your tsconfig
        projectService: true, // (TS-ESLint v8) auto-discovers tsconfig.* in cwd
        tsconfigRootDir: new URL('.', import.meta.url).pathname
      },
      globals: {
        ...globals.node
      }
    },
    rules: {
      // Let TS handle import resolution
      'n/no-missing-import': 'off',
      'import-x/no-unresolved': 'off',

      // Helpful TS rules
      '@typescript-eslint/consistent-type-imports': 'warn',
      '@typescript-eslint/no-misused-promises': ['error', { checksVoidReturn: false }],

      // Team preference examples
      'no-console': 'warn'
    }
  },

  // Looser rules in tests (adjust if you use Vitest/Jest)
  {
    files: ['**/*.test.ts', '**/*.spec.ts'],
    languageOptions: {
      globals: {
        ...globals.node
        // For Vitest: ...globals.vitest
        // For Jest:   ...globals.jest
      }
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'off'
    }
  }
];
