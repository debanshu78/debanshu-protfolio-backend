// eslint.config.js
import js from '@eslint/js'
import globals from 'globals'

export default [
  {
    files: ['**/*.{js,mjs,cjs}'],
    languageOptions: {
      globals: globals.browser,
    },
    ...js.configs.recommended,
    // If you need to add custom rules or override recommended ones, you can add a 'rules' property here.
    // For example:
    // rules: {
    //   "no-unused-vars": "warn",
    //   "no-console": "off",
    // }
  },
]
