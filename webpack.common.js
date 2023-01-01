const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  entry: {
    init: './src/firebase-init.js',
    // factory: { import: './src/factory.js', dependOn: 'init' },
    router: {
      import: './src/router.js',
      dependOn: 'init',
    },
    shell: {
      import: './src/shellV.js',
      dependOn: 'init',
    },
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    // publicPath: '',
    filename: '[name].[contenthash].js',
    assetModuleFilename: 'assets/[name].[hash].[ext]',
    clean: process.env.NODE_ENV === 'production',
  },
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
    },
    minimizer: [`...`, new CssMinimizerPlugin()],
  },
  module: {
    rules: [
      {
        test: /\.s?css$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.js$/i,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.(svg|png|jpg|jpeg|gif)$/,
        type: 'asset/resource',
      },
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/shell.html',
    }),
    new CopyPlugin({
      patterns: [
        {
          from: './src/app.webmanifest',
          to: './app.webmanifest',
        },
        { from: './src/images', to: './images' },
        {
          from: './firebase-messaging-sw.js',
          to: './firebase-messaging-sw.mjs', // needs to change to .mjs so recognized as module
        },
        { from: './src/404.html', to: './404.html' },
      ],
    }),
    // new BundleAnalyzerPlugin(),  // to be used occassionally
  ],
};
