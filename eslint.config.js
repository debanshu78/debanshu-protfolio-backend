// eslint.config.js
import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint"; // <-- Changed this line!

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: {
      globals: globals.browser,
    },
    // Instead of 'extends: ["js/recommended"]', we spread the recommended config directly
    ...js.configs.recommended, // <-- Changed this line!
    // If you need to add custom rules or override recommended ones, you can add a 'rules' property here.
    // For example:
    // rules: {
    //   "no-unused-vars": "warn",
    //   "no-console": "off",
    // }
  },
]);