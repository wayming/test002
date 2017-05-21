/* 
 webpack.config.js
*/  
const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve('build'),
        publicPath: "/public/",
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/},
            { test: /\.css$/, loader: "style-loader!css-loader", exclude: /node_modules/},
            { test: /\.svg$/, loader: "url-loader", exclude: /node_modules/},
            { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader',
                               query: { presets:[ 'es2015', 'react', 'stage-2' ]}
            }
        ]
    }
}