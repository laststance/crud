module.exports = {
  env: {
    'cypress/globals': true,
  },
  extends: ['ts-prefixer', 'plugin:jsx-a11y/recommended'],
  globals: {
    JSX: 'readonly',
  },
  plugins: ['cypress', 'jsx-a11y', 'react-hooks', 'react'],
  rules: {
    'react-hooks/rules-of-hooks': 'error',
    'react/display-name': 'warn',
  },
  settings: {
    react: {
      version: 'detect',
    },
    typescript: {
      alwaysTryTypes: true,
      // always try to resolve types under `<root>@types` directory even it doesn't contain any source code, like `@types/unist`
      project: ['server/tsconfig.json'],
    },
  },
}
