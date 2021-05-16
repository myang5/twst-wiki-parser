module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    'jest/globals': true,
  },
  extends: [
    'plugin:react/recommended',
    'plugin:jest/recommended',
    'eslint:recommended',
    'prettier',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', 'jest', 'jsx-a11y'],
  rules: {
    'linebreak-style': 0,
    'eol-last': 0,
    'arrow-parens': 0,
    'no-use-before-define': 0,
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
    'react/prop-types': 0,
    'jsx-a11y/label-has-associated-control': [1, { assert: 'either' }],
    'react/jsx-one-expression-per-line': 0,
    'object-curly-newline': 0,
    'no-disabled-tests': 0,
    'no-unused-vars': 0,
  },
};
