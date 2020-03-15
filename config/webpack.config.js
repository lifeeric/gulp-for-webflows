
let webpack = require('webpack');
let path    = require('path');
console.log()

module.exports = {
    entry: {
        main: './js/main.js',
        // other: './js/other.js'
    },
    mode: 'development',
    output: {
        publicPath: "/",
        path: path.resolve(__dirname, '../dist/'),
        filename: '[name]-bundle.js'
    },

    // Configuration
    module: {
        rules:[

            // for js
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                }
            }
        ]
    }
}