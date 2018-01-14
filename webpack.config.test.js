const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const Merge = require('webpack-merge');
const commonConfig = require('./webpack.common');
// var CleanWebpackPlugin = require('clean-webpack-plugin')
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
            new webpack.optimize.UglifyJsPlugin(),
            new ExtractTextPlugin("[name].[hash:5].css"),
            new webpack.DefinePlugin({
                'process.env':{ 'NODE_ENV': JSON.stringify('production')},
                'NODE_ENV':  JSON.stringify(env),
                'MID_URL':  JSON.stringify('demo'),
                'GONGJIJIN_URL': JSON.stringify('http://demo.jieba.mifengkong.cn'),
                'SERVICE_URL': JSON.stringify("http://demo.encashment.mifengkong.cn"),
                'SHEBAO_URL': JSON.stringify('http://demo.h5spider.mifengkong.cn'),
                'INV_URL':JSON.stringify('http://demo.loading.mifengkong.cn/?&#/kamaologin?k=97624b863d31490a22d70c5b6c2064eb'),
                'JR_LOG':  JSON.stringify('0'),
            }),
            // new CleanWebpackPlugin(['dist'])


        ]
    })
}
