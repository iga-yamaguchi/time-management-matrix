const path = require('path');
const webpack  = require('webpack');
module.exports = {
    mode: 'development',
    entry: './js/app.js',
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            presets: [
                                ['env', {'modules': false}]
                            ]
                        }
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