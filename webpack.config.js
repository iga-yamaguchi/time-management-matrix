const path = require('path');
const webpack  = require('webpack');
module.exports = {
    mode: 'development',
    entry: [
        'babel-polyfill',
        './js/app.js'
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    {
                        loader: "babel-loader",
                    }
                ],
                exclude: /node_modules/,
            },
            {
                test: /\.vue$/,
                use: [
                    {
                        loader: "vue-loader",
                        options: {
                            loaders: {
                                js: 'babel-loader',
                            }
                        }
                    }
                ]
            },
        ]
    },
    devtool: "inline-source-map"
};