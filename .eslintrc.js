module.exports = {
    parser: '@typescript-eslint/parser',
    extends: [
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
    ],
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
    },
    rules: {
        'no-console': 'off',
        'func-names': 'off',
        'no-underscore-dangle': 'off',
        'consistent-return': 'off',
        'security/detect-object-injection': 'off',
        'no-extra-boolean-cast': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/no-inferrable-types': [
            'warn',
            {
                ignoreParameters: true,
            },
        ],
        '@typescript-eslint/no-unused-vars': 'warn',
    },
};
