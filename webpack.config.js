const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production';

module.exports = {
    mode: isProd ? 'production' : 'development',
    entry: {
        main: './src/js/main.js',
        style: './src/less/style.less'
    },
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'js/[name].js'
    },
    devtool: isProd ? false : 'source-map',
    module: {
        rules: [
            {
                test: /\.less$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: { url: false }
                    },
                    {
                        loader: 'less-loader',
                        options: {
                            lessOptions: {
                                javascriptEnabled: true
                            }
                        }
                    }
                ]
            },
            {
                test: /\.css$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: { url: false }
                    }
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/[name].css'
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: path.dirname(require.resolve('bootstrap/package.json')) + '/fonts',
                    to: 'fonts/bootstrap'
                }
            ]
        })
    ],
    optimization: {
        minimize: isProd,
        minimizer: [
            new TerserPlugin({ extractComments: false }),
            new CssMinimizerPlugin()
        ]
    }
};
