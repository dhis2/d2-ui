'use strict';

const webpack = require('webpack');
const path = require('path');

const dhisConfigPath = process.env.DHIS2_HOME && `${process.env.DHIS2_HOME}/config`;
let dhisConfig;

try {
    dhisConfig = require(dhisConfigPath);
    console.log('\nLoaded DHIS config:');
} catch (e) {
    // Failed to load config file - use default config
    console.warn(`\nWARNING! Failed to load DHIS config:`, e.message);
    console.info('Using default config');
    dhisConfig = {
        baseUrl: 'http://localhost:8080/dhis',
        authorization: 'Basic YWRtaW46ZGlzdHJpY3Q=', // admin:district
    };
}
console.log(JSON.stringify(dhisConfig, null, 2), '\n');

module.exports = {
    context: __dirname,
    entry: {
        'tree-view': './examples/tree-view',
        'data-table': './examples/data-table',
        'org-unit-tree': './examples/org-unit-tree',
        sidebar: './examples/sidebar',
        'icon-picker': './examples/icon-picker',
        'formula-editor': './examples/formula-editor',
        'header-bar': './examples/header-bar',
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
        // Replace any occurance of DHIS_CONFIG with an object with baseUrl and authorization props
        new webpack.DefinePlugin({
            DHIS_CONFIG: JSON.stringify(dhisConfig),
        }),
    ],
    devServer: {
        contentBase: './examples/',
        progress: false,
        colors: true,
        port: 8081,
        inline: true,
        compress: true,
    },
    devtool: ['sourcemap'],
};
