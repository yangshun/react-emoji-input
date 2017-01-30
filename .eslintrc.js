module.exports = {
  parser: 'babel-eslint',
  root: true,
  extends: [
    'airbnb',
  ],
  plugins: [
    'react',
    'jsx-a11y',
    'import',
  ],
  settings: {
    'import/resolver': {
      webpack: {
        config: 'webpack.config.js',
      },
    },
  },
  env: {
    browser: true,
    node: true,
    es6: true,
    jest: true,
  },
  rules: {
    'arrow-body-style': 'off',
    'arrow-parens': ['error', 'as-needed', { requireForBlockBody: true }],
    'import/extensions': ['error', 'always',
      {
        js: 'never',
        jsx: 'never',
      },
    ],
    'max-len': ['error', 120],
    'linebreak-style': 'off',
    'react/jsx-filename-extension': 'off',
    'react/jsx-space-before-closing': 'off',
  },
};
