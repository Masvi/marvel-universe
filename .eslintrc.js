module.exports = {
  env: {
    node: true,
    commonjs: true,
  },
  globals: {
    window: true,
    module: true,
  },
  parserOptions: {
    parser: "babel-eslint",
    ecmaVersion: 2020,
    sourceType: "module",
  },
  extends: [
    "eslint:recommended",
    "plugin:vue/recommended",
    "plugin:vue/essential",
    "plugin:cypress/recommended",
  ],
  rules: {
    "vue/no-unused-vars": "error",
  },
};
