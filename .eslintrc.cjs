module.exports = {
    env: { browser: true, node: true, es2020: true },
    parser: "vue-eslint-parser",
    parserOptions: {
        parser: "@typescript-eslint/parser"
    },
    extends: [
        "eslint:recommended",
        "plugin:vue/vue3-recommended",
    ],
    rules: {
        // Override the tab width for Vue files to match Prettier's tabWidth
        "vue/html-indent": ["error", 4],
        // Add any other ESLint rules or overrides here
    },
};