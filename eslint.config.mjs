// @ts-check
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';

export default tseslint.config(
  // 1️⃣ Bỏ qua file config ESLint chính
  {
    ignores: [
      'node_modules',
      'dist',
      'build',
      '.next',
      'coverage',
      'eslint.config.mjs',
    ],
  },

  // 2️⃣ Base ESLint + TS recommended
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,

  // 3️⃣ Prettier plugin tích hợp ESLint
  prettierRecommended,

  // 4️⃣ Ngôn ngữ + môi trường
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      parserOptions: {
        projectService: true, // cần nếu dùng tsconfig.json
        tsconfigRootDir: import.meta.dirname,
      },
      sourceType: 'module',
    },
  },

  // 5️⃣ Các rule tùy chỉnh (đã fix cho macOS)
  {
    rules: {
      // Prettier
      'prettier/prettier': [
        'error',
        {
          singleQuote: true,
          semi: true,
          trailingComma: 'all',
          endOfLine: 'lf', // 👈 ép dùng LF để không lỗi CRLF trên macOS
          printWidth: 100,
        },
      ],

      // TypeScript
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-floating-promises': 'warn',
      '@typescript-eslint/no-unsafe-argument': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_' },
      ],

      // General
      'no-console': 'off',
    },
  },
);
