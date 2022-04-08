const path = require('path');
// plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  mode: 'development',
  entry: {
    bundle: path.resolve(__dirname, 'src/index.js'),
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
    clean: true,
    assetModuleFilename: '[name][ext]',
  },
  devtool: 'source-map',
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'dist'),
    },
    port: 3000,
    open: true,
    hot: true,
    compress: true,
    historyApiFallback: true,
  },
  module: {
    rules: [
      // each object for each loader/fileType
      {
        // regex for find any files that ends with this extension and apply this loader/loaders
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Webpack App',
      filename: 'index.html',
      template: 'src/template.html',
    }),
    new BundleAnalyzerPlugin(),
  ],
};

// example 1, specify entry as one file, and custom output name
// module.exports = {
//   mode: 'development',
//   entry: path.resolve(__dirname, 'src/index.js'),
//   output: {
//     path: path.resolve(__dirname, 'dist'),
//     filename: 'bundle.js',
//   },
// };

// example 2, specify entry as multiply files and output files gets name dynamically
// module.exports = {
//     mode: 'development',
//     entry: {
//       bundle: path.resolve(__dirname, 'src/index.js'),
//       example: path.resolve(__dirname, 'src/example.js'),
//     },
//     output: {
//       path: path.resolve(__dirname, 'dist'),
//       filename: '[name].js',
//     },
//   };
