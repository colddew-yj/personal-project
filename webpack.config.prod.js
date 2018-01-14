const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const Merge = require('webpack-merge');
const commonConfig = require('./webpack.common');

  module.exports = function(env) {
    return Merge.smart(commonConfig, {
        output: {
            sourceMapFilename: '[name].[chunkhash:5].map',
            filename: "[name].[chunkhash:5].js",
            chunkFilename: '[name].[chunkhash:5].js',
            path: path.resolve(__dirname, 'dist')
        },
        module:{
          rules:[
              {
                  test: /\.css$/,
                  use: ExtractTextPlugin.extract({
                      fallback: "style-loader",
                      use:  [{
                          loader: 'css-loader',
                          options: {
                              minimize: true,
                              camelCase: true
                          }
                      }, 'postcss-loader']
                  })
              },
              {
                  test: /\.less$/,
                  use: ExtractTextPlugin.extract({
                      fallback: 'style-loader',
                      use: [{
                          loader: 'css-loader',
                          options: {
                              minimize: true,
                              camelCase: true
                          }
                      }, 'postcss-loader', 'less-loader']
                  })
              }
          ]
        },
        plugins: [
            new webpack.LoaderOptionsPlugin({
                minimize: true,
                debug: false
            }),
            new webpack.HashedModuleIdsPlugin(),
            new webpack.optimize.UglifyJsPlugin(
            //     {
            //     beautify: false,
            //     mangle: {
            //         screw_ie8: true,
            //         keep_fnames: true
            //     },
            //     compress: {
            //         screw_ie8: true
            //     },
            //     comments: false
            // }
            ),
            new ExtractTextPlugin("[name].[hash:5].css"),
            new webpack.DefinePlugin({
                'process.env':{ 'NODE_ENV': JSON.stringify('production')},
                'NODE_ENV':  JSON.stringify(env),
                'SERVICE_URL': JSON.stringify("https://encashment.mifengkong.cn"),
                'GONGJIJIN_URL': JSON.stringify('http://qianba.mifengkong.cn:810'),
                'MID_URL':  '',
                'SHEBAO_URL': JSON.stringify('http://h5spider.mifengkong.cn'),
                'INV_URL':JSON.stringify('https://loading.mifengkong.cn/?&#/kamaologin?k=62c8472a094d69cba07dbcdd8690c604'),
                'JR_LOG':  JSON.stringify('1'),
            })
        ]
    })
}
