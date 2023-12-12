const path = require("path");
const common = require("./webpack.common");
const { merge } = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const JavascriptMinimizerPlugin = require("terser-webpack-plugin");
const WorkboxPlugin = require('workbox-webpack-plugin');
module.exports = merge(common, {
  mode: "production",
  output: {
    filename: "[name].[contenthash].bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
    assetModuleFilename: "img/[name][ext][query]"
  },
  optimization: {
    minimizer: [new CssMinimizerPlugin(), new JavascriptMinimizerPlugin()],
  },
  plugins: [new MiniCssExtractPlugin({ filename: "[name].[contenthash].css" }), new WorkboxPlugin.GenerateSW()],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader, //3 mini css extract plugin here instead injecting in dom with style-loader
          "css-loader", //2 turns css into common js
          "sass-loader", //1 turns sass into css
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
    ],
  },
});
