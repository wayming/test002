/* 
 webpack.config.js
*/  
const path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  filename: 'index.html',
  inject: 'body'
})

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve('build'),
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/},
            { test: /\.css$/, loader: "style-loader!css-loader", exclude: /node_modules/},
            { test: /\.svg$/, loader: "url-loader", exclude: /node_modules/}
        ]
    },
    plugins: [HtmlWebpackPluginConfig]

}