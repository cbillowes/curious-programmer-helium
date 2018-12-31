const babelOptions = {
  presets: ["babel-preset-gatsby"],
  plugins: [
    "@babel/plugin-proposal-class-properties",
    "remove-graphql-queries",
  ]
}

module.exports = require("babel-jest").createTransformer(babelOptions)