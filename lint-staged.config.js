module.exports = {
  "*.{js,ts}": [
    "prettier --write",
    'eslint --ignore-pattern "**/build-scripts/**/*.js" --fix',
  ],
};
