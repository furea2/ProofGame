const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const DotenvPlugin = require('dotenv-webpack');


module.exports = [
  new ForkTsCheckerWebpackPlugin(),
  new HtmlWebpackPlugin({
    template: 'src/index.html',
    // favicon: 'assets/images/logo.png',
    inject: true,
  }),
  new MiniCssExtractPlugin({
    filename: '[name].[chunkhash].css',
    chunkFilename: '[name].[chunkhash].chunk.css',
  }),
  new DotenvPlugin({
    path: './../../.env',
  }),
];
