const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'eval-source-map',
    devServer: {
        static: path.resolve(__dirname, '../dist'),
        historyApiFallback: true, // 404 to index.html
        port: 5050,
        open: true,
        hot: true,
    },
});