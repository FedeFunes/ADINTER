const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const DashboardPlugin = require('webpack-dashboard/plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = merge(common, {
    mode: 'development',
    output: {
        publicPath: '/',
        path: path.resolve(__dirname, '../dist'),
    },
    bail: false,
    devtool: 'inline-source-map',
    watch: true,
    watchOptions: {
        aggregateTimeout: 300,
        ignored: /node_modules/
    },
    devServer: {
        contentBase: path.join(__dirname, 'build'),
        compress: true,
        watchContentBase: true,
        historyApiFallback: true,
        hot: true
    },
    plugins: [
        new DashboardPlugin(),
        // This clean the folder
        new CleanWebpackPlugin(['dist'], {
            root: process.cwd()
        }), 
        new CopyPlugin([
            {
                from: path.join(__dirname, '../src/favicon.ico'),
                to: path.join(__dirname, '../dist')
            }
        ])
    ],
    resolve: {
        /* 
        La nomenclatura debe ser cuando es: 
        - Cuando es una carpeta: _folder
        - Cuando es un archivo: _file_extension
        */
        alias: {
            '_views_js': path.join(__dirname, '../src/constants/viewsDev.js')
        }
    }
});
