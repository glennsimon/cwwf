const path = require('path');

module.exports = {
  mode: 'development',
  entry: [
    './app/scripts/main.js',
    './app/scripts/signin.js',
    './app/scripts/router.js',
  ],
  devtool: 'inline-source-map',
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist/scripts'),
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};
