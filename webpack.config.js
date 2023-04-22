const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    mode: 'development',
    entry: './src/index.js',

    output: {
        filename: 'main.js',
        /*path: path.resolve(__dirname, 'dist')*/
        path: path.resolve(__dirname, 'public')
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader']
            },
            {
                exclude: /(node_modules)/,
                test: /\.jsx?$/,
                use: 'babel-loader'
            }
        ]
    },

    devtool: 'inline-source-map',

    devServer: {
        static: './public',
        hot: true
    },
    resolve: {
        alias: {
            '@mui/styled-engine': '@mui/styled-engine-sc'
        }
    }
}
