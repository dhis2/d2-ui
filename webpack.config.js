const isProduction = () => process.argv.indexOf('-p') >= 0;
const webpack = require('webpack');
const path = require('path');
const colors = require('colors');
const Visualizer = require('webpack-visualizer-plugin');

const dhisConfigPath = process.env.DHIS2_HOME && `${process.env.DHIS2_HOME}/config`;
let dhisConfig;

try {
    dhisConfig = require(dhisConfigPath);
    // console.log('\nLoaded DHIS config:');
} catch (e) {
    // Failed to load config file - use default config
    // console.warn(`\nWARNING! Failed to load DHIS config:`, e.message);
    // console.info('Using default config');
    dhisConfig = {
        baseUrl: 'http://localhost:8080/dhis',
        authorization: 'Basic YWRtaW46ZGlzdHJpY3Q=', // admin:district
    };
}
// console.log(JSON.stringify(dhisConfig, null, 2), '\n');

function log(req, res, opt) {
    req.headers.Authorization = dhisConfig.authorization;
    console.log('[PROXY]'.cyan.bold, req.method.green.bold, req.url.magenta, '=>'.dim, opt.target.dim);
}

module.exports = {
    context: __dirname,
    entry: isProduction() ?  {
        'header-bar': './src/app-header/index.js',
    } : {
        // 'tree-view': './examples/tree-view',
        // 'data-table': './examples/data-table',
        // 'org-unit-tree': './examples/org-unit-tree',
        // 'org-unit-select': './examples/org-unit-select',
        // sidebar: './examples/sidebar',
        // 'icon-picker': './examples/icon-picker',
        // 'form-builder': './examples/form-builder',
        // 'formula-editor': './examples/formula-editor',
        'header-bar': './examples/header-bar',
        // legend: './examples/legend',
        // translation: './examples/translation',
    },
    output: {
        library: 'Dhis2HeaderBar',
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
    externals: [
        {
            'react': 'React',
            'react-dom': 'ReactDOM',
            'react-addons-transition-group': 'var React.addons.TransitionGroup',
            'rx': 'Rx',
            'react-addons-create-fragment': 'var React.addons.createFragment',
            'd2/lib/d2': 'var d2',
            'lodash': 'var _',
            'lodash/fp': 'fp(_)',
        },
        /^react-addons/,
        /^react-dom$/,
        /^rx$/,
    ],
    plugins: [
        // Set node_env to production to remove extra React logging etc.
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify(isProduction() ? 'production' : 'development'),
            },
        }),
        isProduction() ?
            // Only dedupe on production builds, as the build occasionally bugs out on live reloads
            new webpack.optimize.DedupePlugin()
            :
            // Replace any occurance of DHIS_CONFIG with an object with baseUrl and authorization props
            new webpack.DefinePlugin({
                DHIS_CONFIG: JSON.stringify(dhisConfig),
            }),
        new Visualizer(),
    ],
    devServer: {
        contentBase: './examples/',
        progress: false,
        colors: true,
        port: 8081,
        inline: true,
        compress: true,
    },
    devtool: 'sourcemap',
};
