const {
    defineConfig,
} = require("eslint/config");

const tsParser = require("@typescript-eslint/parser");

const {
    fixupConfigRules,
    fixupPluginRules,
} = require("@eslint/compat");

const react = require("eslint-plugin-react");
const prettier = require("eslint-plugin-prettier");
const typescriptEslint = require("@typescript-eslint/eslint-plugin");
const js = require("@eslint/js");

const {
    FlatCompat,
} = require("@eslint/eslintrc");

const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

module.exports = defineConfig([{
    languageOptions: {
        parser: tsParser,
        ecmaVersion: 2020,
        sourceType: "module",

        parserOptions: {
            warnOnUnsupportedTypeScriptVersion: false,

            ecmaFeatures: {
                jsx: true,
            },
        },
    },

    settings: {
        react: {
            version: "detect",
        },
    },

    extends: fixupConfigRules(compat.extends(
        "prettier",
        "eslint:recommended",
        "plugin:prettier/recommended",
        "plugin:react/recommended",
        "plugin:react-hooks/recommended",
        "plugin:jsx-a11y/recommended",
        "plugin:import/typescript",
        "plugin:@typescript-eslint/recommended",
    )),

    plugins: {
        react: fixupPluginRules(react),
        prettier: fixupPluginRules(prettier),
        "@typescript-eslint": fixupPluginRules(typescriptEslint),
    },

    rules: {
        semi: ["error", "always"],

        quotes: ["error", "single", {
            avoidEscape: true,
        }],

        "prettier/prettier": ["error", {
            endOfLine: "auto",
        }, {
            usePrettierrc: true,
        }],

        "@typescript-eslint/no-unused-vars": ["error"],
        "react/react-in-jsx-scope": "off",
        "react/prop-types": "off",

        "jsx-a11y/anchor-is-valid": ["error", {
            components: ["Link"],
            specialLink: ["hrefLeft", "hrefRight"],
            aspects: ["invalidHref", "preferButton"],
        }],
        "react/no-unknown-property": ["error", {
            ignore: ["intensity", "position", "args"]
        }],
        "@typescript-eslint/no-explicit-any": ["warn"],
    },
}]);
