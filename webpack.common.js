const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const WebpackPwaManifest = require('webpack-pwa-manifest');
const CopyPlugin = require('copy-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  entry: {
    init: './src/firebase-init.js',
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
    assetModuleFilename: './assets/[name].[hash].[ext]',
    clean: true,
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
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
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
      // {
      //   test: /\.html$/,
      //   use: ['html-loader'],
      // },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Crosswords WF',
      filename: 'index.html',
      template: 'src/shell.html',
    }),
    // new HtmlWebpackPlugin({
    //   title: 'Games',
    //   filename: 'pages/games.html',
    //   template: 'src/pages/games.html',
    // }),
    // new HtmlWebpackPlugin({
    //   title: 'Puzzle',
    //   filename: 'pages/puzzle.html',
    //   template: 'src/pages/puzzle.html',
    // }),
    // new HtmlWebpackPlugin({
    //   title: 'Settings',
    //   filename: 'pages/settings.html',
    //   template: 'src/pages/settings.html',
    // }),
    // new HtmlWebpackPlugin({
    //   title: 'Sign in',
    //   filename: 'pages/signin.html',
    //   template: 'src/pages/signin.html',
    // }),
    new MiniCssExtractPlugin({ filename: './assets/[name].[contenthash].css' }),
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
      ],
    }),
    // new BundleAnalyzerPlugin(),  // to be used occassionally
  ],
};
