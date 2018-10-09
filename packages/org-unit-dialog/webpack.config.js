const webpack = require('webpack');
const path = require('path');
const rxPaths = require('rxjs/_esm5/path-mapping');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'index.js',
        library: 'OrgUnitDialog',
        libraryTarget: 'umd',
    },
    module: {
        rules: [
            { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
            { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ },
        ],
    },
    resolve: {
        alias: rxPaths(),
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
