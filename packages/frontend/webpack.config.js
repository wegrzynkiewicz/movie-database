const {resolve} = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

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
                {
                    test: /\.vue$/,
                    use: [
                        {
                            loader: 'vue-loader',
                        }
                    ]
                },
                {
                    test: /\.s[ac]ss$/i,
                    exclude: /\.inline\.scss$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader',
                            options: {
                                modules: {
                                    localIdentName: "[name]__[local]__[hash:4]",
                                },
                            }
                        },
                        "sass-loader",
                    ],
                },
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
            new VueLoaderPlugin(),
        ],
        resolve: {
            alias: {
              'vue$': 'vue/dist/vue.esm.js',
            },
            extensions: ['.js', '.vue'],
        },
        watchOptions: {
            ignored: ['node_modules/**']
        }
    };
}

