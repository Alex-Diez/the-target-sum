let path = require('path');
let src = path.resolve('.', 'src');

module.exports = {
  entry: {
    app: src,
    react: ['react', 'react-dom']
  },
  output: {
    path: path.resolve('public'),
    filename: '[name].bundle.js'
  },
  module: {
    loaders: [
      {test: /\.jsx?$/, loader: 'babel-loader', include: src},
      {test: /\.css$/, loader: 'style-loader!css-loader'},
      {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader"},
      {test: /\.(woff|woff2)$/, loader: "url-loader?prefix=font/&limit=5000"},
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url-loader?limit=10000&mimetype=application/octet-stream"
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url-loader?limit=10000&mimetype=image/svg+xml"
      }
    ]
  }
};