const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.ts'],
    alias: {
      '~': path.resolve(__dirname, './src/'),
    },
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.([jt]s)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.(sc|sa|c)ss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
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
