import js from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import turboPlugin from "eslint-plugin-turbo";
import tseslint from "typescript-eslint";
import onlyWarn from "eslint-plugin-only-warn";
import simpleImportSortPlugin from 'eslint-plugin-simple-import-sort'
import prettierPlugin from "eslint-plugin-prettier";

/**
 * A shared ESLint configuration for the repository.
 *
 * @type {import("eslint").Linter.Config[]}
 * */
export const config = [
  js.configs.recommended,
  eslintConfigPrettier,
  ...tseslint.configs.recommended,
  {
    plugins: {
      turbo: turboPlugin,
      prettier: prettierPlugin,
      "simple-import-sort": simpleImportSortPlugin,
    },
    rules: {
      "turbo/no-undeclared-env-vars": "off",
      'prettier/prettier': [
        'warn', {
          endOfLine: 'auto'
        }
      ],
      'simple-import-sort/imports': [
        'warn',
        {
          groups: [
            // common types
            ['^@/types'],
            // Packages. `react` related packages come first.
            ['^react', '^@?\\w'],
            // Internal packages.
            // api
            ['^@?\\/api'],
            // api
            ['^@?\\/utils'],
            // misc
            ['^@?\\/[^(ui|api|utils)]'],
            // UI
            ['^@?\\/ui\\/[^ce]', '^@?\\/ui\\/e', '^@?\\/ui\\/c'],
            // Side effect imports.
            ['^\\u0000'],
            // Parent imports. Put `..` last.
            ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
            // Other relative imports. Put same-folder imports and `.` last.
            ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
            // Style imports.
            ['^.+\\.s?css$'],
          ],
        },
      ],
      'simple-import-sort/exports': 'warn',
    },
  },
  {
    plugins: {
      onlyWarn,
    },
  },
  {
    ignores: ["dist/**"],
  },
];
