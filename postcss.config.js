// module.exports = {
//     plugins: [
//         require('postcss-smart-import')({ /* ...options */ }),
//         require('precss')({ /* ...options */ }),
//         require('autoprefixer')
//     ]
// }
// const pxtorem = require('postcss-pxtorem');
module.exports = {
    plugins: [
        // pxtorem({
        //     rootValue: 20,
        //     propWhiteList: [],
        // }),
        require('postcss-import')(),
        require('autoprefixer')({ browsers: ['last 10 Chrome versions', 'last 5 Firefox versions', 'Safari >= 6', 'ie > 8'] }),
    ]
};