const path = require('path');
const webpack = require('webpack');
const Merge = require('webpack-merge');
const commonConfig = require('./webpack.common');

 module.exports = function(env) {
    return Merge.smart(commonConfig, {
        output: {
            publicPath:'/',
            filename: "[name].js",
            chunkFilename: '[name].js',
            path: path.resolve(__dirname, 'dist/')

        },
        module:{
          rules:[
              {
                  test: /\.css$/,
                  use: ['style-loader', 'css-loader', 'postcss-loader']
              },
              {
                  test: /\.less$/,
                  use: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader']
              }
          ]
        },
        plugins: [
            new webpack.DefinePlugin({
                'process.env': {
                    'NODE_ENV': JSON.stringify('develop')
                },
                'NODE_ENV':  JSON.stringify(env),
                'MID_URL':  JSON.stringify('demo'),
                'SERVICE_URL': JSON.stringify("http://demo.encashment.mifengkong.cn"),
                'SHEBAO_URL': JSON.stringify('http://demo.h5spider.mifengkong.cn'),
                'INV_URL':JSON.stringify('http://demo.loading.mifengkong.cn/?&#/kamaologin?k=97624b863d31490a22d70c5b6c2064eb'),
                'JR_LOG':  JSON.stringify('0'),
            }),
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NamedModulesPlugin(),
        ],
        devtool: 'cheap-source-map',
        devServer: {
            // stats: 'minimal',
            // filename: "main.js",
            contentBase: path.join(__dirname, 'dist'),//本地服务器所加载的页面所在的目录
            historyApiFallback: true,//不跳转
            inline: true,//实时刷新,
            port:8012,
            hot: true,
            publicPath:'/'
        }
    })
}
