const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  devtool: 'source-map',
  resolve: {
    extensions: ['.js'],
    alias: {
      '~components': path.resolve(__dirname, './src/components/'),
      '~constants': path.resolve(__dirname, './src/constants/'),
      '~store': path.resolve(__dirname, './src/store/'),
      '~utils': path.resolve(__dirname, './src/utils/'),
    },
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.(sc|sa|c)ss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },
  devServer: {
    contentBase: path.resolve(__dirname, './dist'),
    port: 3000,
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'dom stuff',
      template: './src/index.html',
    }),
    new MiniCssExtractPlugin(),
  ],
};
