module.exports = {
  "env": {
    "browser": true,
    "es6": true
  },
  "plugins": [
    "react",
    "flowtype"
  ],
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:flowtype/recommended"
  ],
  "parserOptions": {
    "ecmaFeatures": {
      "experimentalObjectRestSpread": true,
      "jsx": true
    },
    "sourceType": "module"
  },
  "rules": {
    "no-console": "off",
    "indent": [
      "error", 2
    ],
    "linebreak-style": [
      "error", "unix"
    ],
    "quotes": [
      "error", "single"
    ],
    "semi": [
      "error", "always"
    ]
  }
};
