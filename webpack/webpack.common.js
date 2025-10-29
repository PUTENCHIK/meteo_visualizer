// config/webpack.common.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');

const production = process.env.NODE_ENV === 'production';

module.exports = {
    entry: path.resolve(__dirname, '..', './src/index.tsx'),
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'static/scripts/[name].[contenthash].js',
        publicPath: '/',
        assetModuleFilename: 'assets/[hash][ext][query]',
        clean: true,
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js', '.json'],
        alias: {
            '@components': path.resolve(__dirname, '../src/components/'),
            '@styles': path.resolve(__dirname, '../src/styles/'),
        },
    },
    module: {
        rules: [
            // TS и TSX
            {
                test: /\.(ts|tsx)$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
                options: {
                    logLevel: 'INFO',
                    transpileOnly: true
                },
            },
            // CSS
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            // SCSS not modules
            {
                // test: /\.(sa|sc|c)ss$/,
                // use: [
                //     production ? MiniCssExtractPlugin.loader : 'style-loader',
                //     {
                //         loader: 'css-loader',
                //         options: {
                //             modules: {
                //                 mode: 'local',
                //                 localIdentName: '[name]__[local]__[hash:base64:5]',
                //                 auto: /\.module\.\w+$/i,
                //             },
                //             importLoaders: 2,
                //         },
                //     },
                //     'postcss-loader',
                //     {
                //         loader: 'sass-loader',
                //         options: {
                //             sourceMap: true,
                //         },
                //     },
                // ],
            },
            // Files
            {
                test: /\.(png|jpe?g|gif|svg|webp|woff2?|eot|ttf|otf|gltf|glb|obj|mtl|ico)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'assets/[name].[hash].[ext]',
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../public/index.html'),
            filename: 'index.html',
            favicon: path.resolve(__dirname, '../public/favicon.ico',),
        }),
        // new MiniCssExtractPlugin({
        //     filename: production
        //         ? 'static/styles/[name].[contenthash].css'
        //         : 'static/styles/[name].css',
        // }),
        new webpack.EnvironmentPlugin({
            NODE_ENV: 'development',
        }),
    ],
};
