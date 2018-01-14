/**
 * Created by yejian on 2017-05-14.
 */
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ChunkManifestPlugin = require("chunk-manifest-webpack-plugin");
const WebpackChunkHash = require("webpack-chunk-hash");
var CopyWebpackPlugin = require('copy-webpack-plugin');
// var CleanWebpackPlugin = require('clean-webpack-plugin');
// var HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');
var dllPath = path.resolve(__dirname,'dist','vendor.dll.js');
var dll = require('./dist/vendor.dll');

const ROOT_PATH = path.resolve(__dirname);

const APP_PATH = path.resolve(ROOT_PATH, 'src'); //__dirname 中的src目录，以此类推
// const BUILD_PATH = path.resolve(ROOT_PATH, 'dist/'); //发布文件所存放的目录
// const path = require('path');
const svgDirs = [
    require.resolve('antd-mobile').replace(/warn\.js$/, '')  // 1. 属于 antd-mobile 内置 svg 文件
    // path.resolve(__dirname, 'src/my-project-svg-foler'),  // 2. 自己私人的 svg 存放目录
];
const commonConfig = {
    entry: {
        app: path.resolve(APP_PATH, 'app.jsx'), // 定义入口文件
        // vendors:[dllPath]
    },

    resolve: {
        // modulesDirectories: ['node_modules', path.join(__dirname, '../node_modules')],
        extensions: [".web.js", ".js", ".jsx", ".json","vue"],
        // alias: {
        //     'dll': dllPath
        // }
    },
    // externals:{
    //     dll:dll
    // },

    module: {
        rules: [

            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: ['babel-loader']
            }, {
                test: /\.jsx$/,
                exclude: /(node_modules|bower_components)/,
                use: ['babel-loader']
            }, {
                test: /\.(png|jpe?g|gif)$/i,
                use: {
                    loader: 'file-loader',
                    options: {
                        limit: 8989,
                        name: 'images/[hash:5].[name].[ext]',
                        publicPath: '/',
                        mimetype: 'image/png'
                    }
                }
            }, {
                test: /\.(woff|woff2|eot|ttf)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        limit: 100000
                    }

                }
            }, {
                test: /\.(htm|html)$/,
                use: [{
                    loader: 'html-loader',
                    options: {
                        minimize: true
                    }
                }],
            }, {
                test: /\.(svg)$/i,
                use: {
                    loader: 'svg-sprite-loader'
                },
                include: svgDirs,

            }]
    },

    plugins: [
        // new webpack.optimize.CommonsChunkPlugin({
        //     names:['vendors', 'manifest'],
        //     minChunks:Infinity
        // }),
        new HtmlWebpackPlugin(
            {
                filename: 'index.html',
                title: 'index.html',
                // template: 'html-withimg-loader!'+path.resolve(__dirname, 'src/entrie/index.html'),
                template: path.resolve(ROOT_PATH, 'index.html'),
                inject: true
            }
        ),
        // new WebpackChunkHash(),
        // new ChunkManifestPlugin({
        //     filename: "chunk-manifest.json",
        //     manifestVariable: "webpackManifest",
        //     inlineManifest: true
        // }),
        new webpack.ProvidePlugin({//自動加載模块
            React: 'React'
        }),
        // new CleanWebpackPlugin(['dist']),
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require('./dist/vendor-manifest.json')
        }),
        new webpack.DefinePlugin({
            'ANDROIDPACK':JSON.stringify("http://sudaiapk.oss-cn-shenzhen.aliyuncs.com/cn.rongdao.jrkabao_%E5%8D%A1%E7%8C%AB%E4%BF%A1%E7%94%A8%E5%8D%A1%E6%8F%90%E7%8E%B0_383_27_%E5%8D%A1%E7%8C%AB%E5%AE%98%E6%96%B9%E4%B8%8B%E8%BD%BD_kamaoguanfangxiazai_sign.apk"),
            'YINGYONGBAOURL':JSON.stringify('http://a.app.qq.com/o/simple.jsp?pkgname=cn.rongdao.jrkabao'),
            'IOSPACK':JSON.stringify('https://itunes.apple.com/cn/app/id1249660631?mt=8'),
            'PACKAGE_NAME':JSON.stringify('quxianh5'),
            'APP_NAME':JSON.stringify('kamaoh5'),
            'WxShareIcon':JSON.stringify('https://mifengkong.oss-cn-shenzhen.aliyuncs.com/weixin/kamao2.png')
        }),
        // new HtmlWebpackIncludeAssetsPlugin({
        //     assets: ['./dist/vendor.dll.js'],
        //     append: false,
        //     jsExtensions: ['.js']
        // })
        // new CopyWebpackPlugin([
        //     {from: './dist', to: './dist'}
        // ])


    ]
}
module.exports = commonConfig