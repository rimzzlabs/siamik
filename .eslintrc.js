/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: ['plugin:@typescript-eslint/recommended', 'next/core-web-vitals'],
  rules: {
    'prefer-const': 'warn',
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-extra-semi': 'off',
    '@typescript-eslint/consistent-type-imports': 'warn',
  },
}
