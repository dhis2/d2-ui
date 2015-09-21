var webpack = require('webpack');
var path = require('path');

module.exports = {
    context: __dirname,
    entry: './example/example.js',
    output: {
        path: path.join(__dirname, '/build'),
        filename: 'example.js',
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: [/(node_modules)/],
                loader: 'babel',
                query: {
                    stage: 0,
                },
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader',
            },
        ],
    },
    plugins: [
        new webpack.optimize.DedupePlugin(),
    ],
    devServer: {
        contentBase: './example/',
        progress: true,
        colors: true,
        port: 8081,
        inline: true,
    },
    devtool: ['sourcemap'],
};
