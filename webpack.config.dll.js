const path = require('path')
const webpack = require('webpack');

module.exports = {
    entry: {
        vendor: ['react','react-dom','redux','redux-thunk','react-redux',
            'react-router','react-router-dom','jrbasic',  'antd-mobile','babel-plugin-antd','md5', 'rc-animate','rc-banner-anim','rc-form-validation','react-router-redux',
            'route']
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].dll.js',
        library: '[name]_[chunkhash]', // 当前Dll的所有内容都会存放在这个参数指定变量名的一个全局变量下，注意与DllPlugin的name参数保持一致
    },
    plugins: [
        new webpack.DllPlugin({
            context:__dirname,
            path: path.resolve(__dirname, 'dist', 'vendor-manifest.json'), // 本Dll文件中各模块的索引，供DllReferencePlugin读取使用
            name: '[name]_[chunkhash]',
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
            }
        )

    ],
}