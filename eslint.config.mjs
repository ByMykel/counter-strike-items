import globals from "globals";
import parser from "vue-eslint-parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";
import pluginVue from 'eslint-plugin-vue'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [
    ...pluginVue.configs['flat/recommended'],
    {
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node,
            },

            parser: parser,
            ecmaVersion: 5,
            sourceType: "commonjs",

            parserOptions: {
                parser: "@typescript-eslint/parser",
            },
        },

        rules: {
            "vue/html-indent": ["error", 4],
        },
    }
];