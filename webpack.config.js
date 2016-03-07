var webpack = require('webpack');
var path = require('path');

module.exports = {
    context: __dirname,
    entry: {
        treeview: './examples/treeview.js',
    },
    output: {
        path: path.join(__dirname, '/build'),
        filename: '[name].js',
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: [/(node_modules)/],
                loader: 'babel',
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
        contentBase: './examples/',
        progress: true,
        colors: true,
        port: 8081,
        inline: true,
    },
    devtool: ['sourcemap'],
};
