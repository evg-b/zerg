module.exports = {
  plugins: ['react'],
  extends: [
    'plugin:react/recommended',
    'plugin:prettier/recommended',
    'standard-with-typescript'
  ],
  parserOptions: {
    project: './tsconfig.json',
  },
  ignorePatterns: ['dist/', 'node_modules/'],
  rules: {
    camelcase: 'off',
    '@typescript-eslint/camelcase': 'off',
    'no-useless-constructor': 'off',
    '@typescript-eslint/no-useless-constructor': 'error'
  }
}
