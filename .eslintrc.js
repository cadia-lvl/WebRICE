module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    plugins: [
      '@typescript-eslint',
    ],
    "rules": {
      //We want to be able to have incompleate classes and such for now
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": "warn",
      "linebreak-style": "off"
    },
    extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      "google"
    ],
    
  };
