const path = require('path')
const myPlugin = require('./myPlugin')
const htmlNew = require('html-webpack-plugin')

module.exports = {
    entry: './test.js',
    mode: 'production',
    output: {
        filename: "[name].js",
        path: path.join(__dirname, './src')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                }
            }
        ]
    },
    externals: {
        react: 'react',
        'react-dom': 'react-dom'
    },
    plugins: [new myPlugin(), new htmlNew()]


}