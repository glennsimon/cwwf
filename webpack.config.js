const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  mode: 'development',
  entry: {
    init: {
      import: './src/firebase-init.js',
      dependOn: 'fb_essentials',
    },
    signin: {
      import: './src/signin.js',
    },
    router: {
      import: './src/router.js',
      dependOn: 'presenter',
    },
    event_bus: {
      import: './src/event-bus.js',
    },
    model: {
      import: './src/model.js',
      dependOn: ['fb_essentials', 'event_bus', 'init'],
    },
    view: {
      import: './src/view.js',
      dependOn: ['fb_essentials', 'event_bus', 'init'],
    },
    presenter: {
      import: './src/presenter.js',
      dependOn: ['fb_essentials', 'event_bus', 'init', 'signin'],
    },
    fb_essentials: [
      'firebase/firestore',
      'firebase/auth',
      'firebase/functions',
      'firebase/app',
      'firebase/messaging',
      'firebase/analytics',
      'firebase/database',
    ],
  },
  devtool: 'inline-source-map',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
    clean: {
      keep: /images\//,
    },
  },
  optimization: {
    splitChunks: { chunks: 'all' },
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
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
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Crosswords WF',
      filename: 'index.html',
      template: 'src/template.html',
    }),
    // new BundleAnalyzerPlugin(),
  ],
};
