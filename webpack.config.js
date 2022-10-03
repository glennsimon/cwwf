const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  mode: 'production',
  entry: {
    init: './src/firebase-init.js',
    signin: {
      import: './src/signin.js',
      dependOn: 'init',
    },
    router: {
      import: './src/router.js',
      dependOn: 'init',
    },
    controller: {
      import: './src/controller.js',
      dependOn: ['init', 'signin', 'router'],
    },
    view: {
      import: './src/view.js',
      dependOn: 'controller',
    },
  },
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
    clean: {
      keep: /(images\/|app\.webmanifest)/,
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
      // {
      //   test: /\.(png|svg|jpg|jpeg|gif)$/i,
      //   type: 'asset/resource',
      // },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Crosswords WF',
      filename: 'index.html',
      template: 'src/template.html',
    }),
    new WorkboxPlugin.GenerateSW({
      // these options encourage the ServiceWorkers to get in there fast
      // and not allow any straggling "old" SWs to hang around
      clientsClaim: true,
      skipWaiting: true,
    }),
    // new BundleAnalyzerPlugin(),
  ],
};
