const path = require(`path`);

module.exports = {
  entry: [
    `./js/util.js`,
    `./js/stat.js`,
    `./js/backend.js`,
    `./js/wizard.js`,
    `./js/debounce.js`,
    `./js/setup-render.js`,
    `./js/setup-show.js`,
    `./js/setup-move.js`,
    `./js/game.js`
  ],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname),
    iife: true
  },
  devtool: false
};
