import { FlatCompat } from "@eslint/eslintrc"
import js from "@eslint/js"
import typescriptEslintEslintPlugin from "@typescript-eslint/eslint-plugin"
import typescriptEslint from "typescript-eslint"
import tsParser from "@typescript-eslint/parser"
import react from "eslint-plugin-react"
import path from "node:path"
import { fileURLToPath } from "node:url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
})

/** @type {import('eslint').Linter.Config[]} */

export default [
  {
    ignores: ["**/node_modules", "**/dist", "**/*.config.js"],
  },
  ...compat.extends("plugin:prettier/recommended"),
  {
    plugins: {
      "@typescript-eslint": typescriptEslint,
      "@typescript-eslint": typescriptEslintEslintPlugin,
      react,
    },

    languageOptions: {
      globals: {
        eslint: false,
      },

      parser: tsParser,
    },
  },
]
