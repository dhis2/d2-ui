const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'index.js',
        library: 'Interpretations',
        libraryTarget: 'umd',
    },
    module: {
        rules: [
            { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
            { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ },
            { test: /\.css$/, loader: 'style-loader!css-loader'},
        ],
    },
    devtool: 'source-map',
    externals: {
        react: {
            root: 'React',
            amd: 'react',
            commonjs2: 'react',
            commonjs: 'react',
        },
        'react-dom': {
            root: 'ReactDOM',
            commonjs2: 'react-dom',
            commonjs: 'react-dom',
            amd: 'react-dom',
            umd: 'react-dom',
        },
    },

    plugins: [new webpack.optimize.ModuleConcatenationPlugin()],
};
