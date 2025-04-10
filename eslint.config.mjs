import { defineConfig, globalIgnores } from "eslint/config";
import typescriptEslintEslintPlugin from "@typescript-eslint/eslint-plugin";
import react from "eslint-plugin-react";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default defineConfig([globalIgnores(["**/node_modules", "**/dist", "**/*.config.js"]), {
    extends: compat.extends("plugin:prettier/recommended"),

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
}]);