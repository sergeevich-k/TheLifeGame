const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    mode: 'development',
    entry: './src/index.js',

    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                exclude: /(node_modules)/,
                test: /\.jsx?$/,
                use: 'babel-loader',
            },
        ],
    },

    devtool: 'inline-source-map',

    devServer: {
        static: './public',
        hot: true,
    },
}
