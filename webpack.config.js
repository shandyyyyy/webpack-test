const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env, argv) => {
  console.log(env, argv);
  return {
    mode: 'development',
    devtool: 'inline-source-map',
    entry: './src/index.ts',
    // entry: {
    //   // index: './src/index.js',
    //   // another: './src/another-module.js'
    // },
    output: {
      filename: '[name].[contenthash].js',
      path: path.resolve(__dirname, 'dist'),
      clean: true,
    },
    optimization: {
      moduleIds: 'deterministic',
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          }
        }
      },
      runtimeChunk: 'single'
    },
    devServer: {
      contentBase: './dist',
    },
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader']
        },
        {
          test: /\.(png|jpg|svg|jpeg|gif)$/i,
          use: 'asset/resouce',
        },
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        }
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js']
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: 'webpack-test'
      }),
    ],
  }
  
}