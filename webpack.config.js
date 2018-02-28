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
                ]
            }
        ]
    }

};