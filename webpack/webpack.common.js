const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

require('dotenv').config();

module.exports = {
    entry: {
        main: [
            '@babel/polyfill',
            path.join(__dirname, '../src/index.js')
        ]
    },
    devtool: false,
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'fonts/'
                        }
                    }
                ]
            },
            {
                test: /\.(jpg|png)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'assets/'
                        }
                    }
                ]
            }
        ]
    },
    output: {
        filename: '[name].[hash].bundle.js',
        chunkFilename: '[name].[hash].bundle.js',
    },
    resolve: {
        extensions: ['.js'],
        alias: {
            /* 
            La nomenclatura debe ser: 
            - Cuando es una carpeta: _folder
            - Cuando es un archivo: _file_extension
            */
            '_constants': path.join(__dirname, '../src/constants/'),
            '_shared': path.join(__dirname, '../src/shared/'),
            '_sections': path.join(__dirname, '../src/sections/'),
            '_utils': path.join(__dirname, '../src/utils/')
        },
    },
    plugins: [
        new webpack.DefinePlugin({
            CONFIG: {
                CONNECT_TO_DEV_TOOLS: JSON.stringify(
                    process.env.CONNECT_TO_DEV_TOOLS
                ),
                ENVIRONMENT: JSON.stringify(process.env.ENVIRONMENT)
            }
        }),
        new HtmlWebPackPlugin({
            template: path.join(__dirname, '../src/index.html'),
            filename: 'index.html',
            // favicon: path.join(__dirname, '../src/favicon.ico')
        }),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: '[name].[hash].css',
            chunkFilename: '[hash].css'
        }),
    ]
};
