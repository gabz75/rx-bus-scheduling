module.exports = {
    "extends": [
      "airbnb",
    ],
    "plugins": [
      "jest"
    ],
    "env": {
      browser: true,
      jest: true,
    },
    "settings": {
      "react": {
        "version": "detect",
      },
      "import/resolver": {
        "node": {
          "moduleDirectory": ["node_modules", "src/"]
        }
      }
    },
    "ignorePatterns": [
      "src/index.js",
      "src/serviceWorker.js",
    ],
    "rules": {
      "react/jsx-props-no-spreading": 0,
      "react/jsx-filename-extension": 0,
      "max-len": [1, 120],
    },
};
