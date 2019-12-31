const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const { StatsWriterPlugin } = require('webpack-stats-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const WebpackMonitor = require('webpack-monitor');
const argv = require('yargs').argv;
const DIST_PATH = '../../adintar-channel/src/main/webapp/front/app';
const TerserPlugin = require('terser-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = merge(common, {
    mode: 'production',
    output: {
        publicPath: './',
        path: path.resolve(__dirname, DIST_PATH),
    },
    bail: true,
    devtool: false,
    plugins: [
        new StatsWriterPlugin({
            filename: 'stats.json'
        }),
//        new WebpackMonitor({
//            capture: true,
//            launch: argv.monitor
//        }),
        new CopyPlugin([{
            from: path.join(__dirname, '../src/favicon.ico'),
            to: path.join(__dirname, DIST_PATH),
        }]),
        // Borra archivos que quedan obsoletos
        new CleanWebpackPlugin(['main*', 'vendors*'], {
            root: path.join(__dirname, DIST_PATH),
        })
    ],
    optimization: {
        minimizer: [
            new TerserPlugin({
                sourceMap: true,
                terserOptions: {
                    compress: {
                        drop_console: true
                    }
                }
            })
        ],
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all'
                }
            }
        }
    },
    resolve: {
        /* 
        La nomenclatura debe ser: 
        - Cuando es una carpeta: _folder
        - Cuando es un archivo: _file_extension
        */
        alias: {
            '_views_js': path.join(process.cwd(), '/src/constants/viewsProd.js')
        }
    }
});
