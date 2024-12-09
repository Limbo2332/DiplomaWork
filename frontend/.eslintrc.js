module.exports = {
  parser: "@babel/eslint-parser",
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
      modules: true,
    },
  },
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
  ],
  settings: {
    react: {
      version: "detect",
    },
  },
  plugins: ["react", "react-hooks"],
  rules: {
    "no-unused-vars": "warn",
    "no-console": "off",
    eqeqeq: ["error", "always"],
    curly: "error",
    semi: ["error", "always"],
    indent: "off",
    "react/react-in-jsx-scope": "off",
    "no-multiple-empty-lines": ["error", { max: 1 }],
    "comma-dangle": ["error", "always-multiline"],
    "react/prop-types": "off",
  },
};
