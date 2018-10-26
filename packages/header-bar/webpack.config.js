const webpack = require('webpack');
const rxPaths = require('rxjs/_esm5/path-mapping');

const path = require('path')

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'index.js',
        library: 'HeaderBar',
        libraryTarget: 'umd',
    },
    resolve: {
        alias: rxPaths(),
    },
    module: {
        rules: [
			{ test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
			{ test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ }
        ]
    },
    externals: {
        "react": {
            root: 'React',
            amd: 'react',
            commonjs2: 'react',
            commonjs: 'react'
        }
    },
    plugins: [new webpack.optimize.ModuleConcatenationPlugin()],
}
