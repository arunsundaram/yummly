var webpack = require('webpack');
var path = require('path');
var CopyWebpackPlugin = require('copy-webpack-plugin');

var webpackConfig = {
    resolve: {
        extensions: ['', '.js']
    },
    entry: [
        './client.js'
    ],
    output: {
        path: path.resolve('./build/'),
        publicPath: '/public/',
        filename: 'main.min.js'
    },
    module: {
        loaders: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loaders: [
                    require.resolve('babel-loader')
                ]
            },
            { test: /\.css$/, loaders: ['style', 'css']},
            { test: /\.json$/, loader: 'json-loader'}
        ]
    },
    node: {
        setImmediate: false
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new CopyWebpackPlugin([
            {from: 'styles/*.css'},
            {from: 'static/img/*.png'}
        ])
    ],
    devtool: 'source-map'
};

module.exports = webpackConfig;
