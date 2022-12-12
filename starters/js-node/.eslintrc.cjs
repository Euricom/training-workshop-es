module.exports = {
  extends: ['airbnb-base', 'prettier'],
  plugins: ['import'],
  env: {
    es2021: true,
    node: true,
  },
  parserOptions: {
    sourceType: 'module',
  },
  rules: {
    // Disable for 'modules'
    'import/extensions': 'off',

    // Allowed for demo purposes
    'no-console': 'off',

    // Play nicely with Windows.
    'linebreak-style': 'off',

    // Not our taste?
    'consistent-return': 'off',
    'no-plusplus': 'off',
    'no-restricted-syntax': 'off',
  },
};
