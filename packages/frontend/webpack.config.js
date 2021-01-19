const {resolve} = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = function (env, options = {}) {

    const mode = options.mode || 'development';

    return {
        entry: {
            main: [
                './src/index.js',
            ],
        },
        mode,
        module: {
            rules: [
            ],
        },
        output: {
            path: resolve(__dirname, 'build'),
            filename: '[name].[contenthash:6].js',
        },
        plugins: [
            new CleanWebpackPlugin({}),
            new HtmlWebpackPlugin({
                cache: false,
                inject: 'head',
                publicPath: '',
                scriptLoading: 'defer',
                template: 'src/index.html',
            }),
            new MiniCssExtractPlugin({
                filename: '[name].[contenthash:6].css',
            }),
        ],
        watchOptions: {
            ignored: ['node_modules/**']
        }
    };
}

