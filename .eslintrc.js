module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        warnOnUnsupportedTypeScriptVersion: false,
        ecmaFeatures: {
            jsx: true,
        },
    },
    settings: {
        react: {
            version: 'detect',
        },
    },
    // Global env variables
    // env: {
    //     browser: true,
    //     amd: true,
    //     node: true,
    // },
    extends: [
        'prettier',
        'eslint:recommended',
        'plugin:prettier/recommended',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'plugin:jsx-a11y/recommended',
        'plugin:import/typescript',
        'plugin:@typescript-eslint/recommended',
    ],
    plugins: ['react', 'prettier', '@typescript-eslint'],
    rules: {
        semi: [4, 'always'],
        quotes: [2, 'single', { avoidEscape: true }],
        'prettier/prettier': ['error', {endOfLine: 'auto'}, { usePrettierrc: true }],
        '@typescript-eslint/no-unused-vars': ['error'],
        'react/react-in-jsx-scope': 'off',
        'react/prop-types': 'off',
        // '@typescript-eslint/explicit-function-return-type': 'off',
        // '@typescript-eslint/explicit-module-boundary-types': 'off',
        'jsx-a11y/anchor-is-valid': [
            'error',
            {
                components: ['Link'],
                specialLink: ['hrefLeft', 'hrefRight'],
                aspects: ['invalidHref', 'preferButton'],
            },
        ],
    },
};
