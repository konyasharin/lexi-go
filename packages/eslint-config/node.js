import globals from "globals";
import { config as baseConfig } from "./base.js";

/**
 * A custom ESLint configuration for nodejs
 *
 * @type {import("eslint").Linter.Config[]} */
export const config = [
  ...baseConfig,
  {
    languageOptions: {
      globals: {
        ...globals.serviceworker,
        ...globals.browser,
      },
    },
    rules: {
      '@typescript-eslint/no-unused-vars': "off"
    }
  },
];
