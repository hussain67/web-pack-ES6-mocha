const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const ImageminPlugin = require('imagemin-webpack-plugin').default;

module.exports = {
    mode: 'production',
    entry: ['@babel/polyfill', './src/scripts/index.js'],
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, './dist'),
        publicPath: ''
    },

    devServer: {
        contentBase: path.resolve(__dirname, './dist'),
        index: 'index.html',
        compress: true,
        port: 9000
    },


    module: {
        rules: [{
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                }
            },

            {
                test: /\.html$/,
                use: [{
                    loader: "html-loader",
                    options: {
                        minimize: true
                    }
                }]
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [{
                        loader: 'url-loader',
                        options: {
                            name: './images/[name].[ext]',
                            limit: 10000
                        }
                    },
                    {
                        loader: "img-loader"
                    }
                ]
            },

            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader',
                ]
            },
        ]
    },

    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            template: __dirname + '/src/index.html',
            filename: 'index.html',
            inject: 'body'
        }),

        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
            chunkFilename: "[id].css"
        }),

        /* new CopyWebpackPlugin([
            {
                from:'src/images',to:'images',
            } 
        ]), 
        new ImageminPlugin({ test: /\.(jpe?g|png|gif|svg)$/i }) */
    ],

    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: true
            }),
            new OptimizeCSSAssetsPlugin({})
        ]
    },


}