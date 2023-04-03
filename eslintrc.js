module.exports = {
    root: true,
    env: {
      node: true,
    },
    extends: [
      'eslint:recommended',
      'plugin:vue/recommended',
      
    ],
    parserOptions: {
      parser: 'babel-eslint',
    },
    rules: {
      // your custom ESLint rules here
    },
  };