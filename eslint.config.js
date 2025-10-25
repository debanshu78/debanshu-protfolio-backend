// eslint.config.js
import js from '@eslint/js'
import globals from 'globals'

export default [
  {
    files: ['**/*.{js,mjs,cjs}'],
    languageOptions: {
      globals: {
        ...globals.node, // Add this line for Node.js globals
        ...globals.browser, // (optional) keep browser globals if you need both
      },
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
