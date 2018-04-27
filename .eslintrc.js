module.exports = {
    root: true,
    parser: 'babel-eslint',
    parserOptions: {
        sourceType: 'module'
    },
    env: {
        browser: true,
    },
    extends: 'google',
    // required to lint *.vue files
    plugins: [
        'html',
        'eslint-plugin-flowtype'
    ],
    // add your custom rules here
    'rules': {
        'semi': [2, 'never'],
        // allow paren-less arrow functions
        'arrow-parens': 0,
        // allow async-await
        'generator-star-spacing': 0,
        // allow debugger during development
        'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
        'indent': [2, 4, {"SwitchCase" : 1}],
        'require-jsdoc': 0,
        'comma-dangle': [2, 'never'],
        'max-len': [1, 120],
        'switch-colon-spacing': 0
    }
}
