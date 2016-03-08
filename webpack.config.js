var webpack = require('webpack');
var path = require('path');

module.exports = {
    context: __dirname,
    entry: {
        treeview: './examples/tree-view/treeview.js',
        datatable: './examples/data-table/datatable.js',
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
            {
                test: /\.scss$/,
                loader: 'style!css!sass',
            },
        ],
    },
    plugins: [
        new webpack.optimize.DedupePlugin(),
    ],
    devServer: {
        contentBase: './examples/',
        progress: false,
        colors: true,
        port: 8081,
        inline: true,
    },
    devtool: ['sourcemap'],
};
