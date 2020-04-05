module.exports = {
  extends: [
    'stylelint-config-recommended',
    'stylelint-prettier',
    'stylelint-config-rational-order',
    'stylelint-prettier/recommended',
  ],
  plugins: ['stylelint-scss'],
  rules: {
    'prettier/prettier': true,
  },
};
