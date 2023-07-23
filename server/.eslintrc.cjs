module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: 'standard',
    overrides: [
        {
            env: {
                node: true,
            },
            files: ['.eslintrc.{js,cjs}'],
            parserOptions: {
                sourceType: 'script',
            },
        },
    ],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    extends: ['prettier'],
    plugins: ['prettier'],
    rules: {
        'prettier/prettier': ['error'],
    },
}
