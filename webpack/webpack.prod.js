// const { merge } = require('webpack-merge');
// const common = require('./webpack.common.js');

module.exports = {
    mode: 'production',
    devtool: 'source-map',
    optimization: {
        minimize: true,
        splitChunks: {
            chunks: 'all',
        },
    },
};
