"use strict";
const path = require("path");
const autoprefixer = require("autoprefixer");
const webpack = require("webpack");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const miniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = {
  mode: "development",
  entry: "./src/client/index.js",
  output: {
    path: path.resolve(__dirname, "dist"), // Replace 'dist' with your desired output directory
    filename: "main.js",
    // publicPath: "/",
    // libraryTarget: "var",
    // library: "Client",
  },
  // devServer: {
  //   static: path.resolve(__dirname, "dist"),
  //   port: 8080,
  //   hot: false,
  // },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },

      {
        test: /\.scss$/,
        use: [
          {
            // extracts css for each js file that includes css
            loader: miniCssExtractPlugin.loader,
          },
          {
            // Interprets `@import` and `url()` like `import/require()` and will resolve them
            loader: "css-loader",
          },
          {
            // Loader for webpack to process CSS with PostCSS
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [autoprefixer],
              },
            },
          },
          {
            // Loads a SASS/SCSS file and compiles it to CSS
            loader: "sass-loader",
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/client/views/index.html",
      filename: "./index.html",
    }),

    new miniCssExtractPlugin(),

    new CleanWebpackPlugin({
      // Simulate the removal of files
      dry: false,
      // Write Logs to Console
      verbose: true,
      // Automatically remove all unused webpack assets on rebuild
      cleanStaleWebpackAssets: true,
      protectWebpackAssets: false,
    }),
  ],
};
