const isProduction = () => process.argv.indexOf('-p') >= 0;
const webpack = require('webpack');
const path = require('path');
require('colors');
const Visualizer = require('webpack-visualizer-plugin');
const version = require('./package.json').version;

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

module.exports = {
    context: __dirname,
    entry: isProduction() ?  {
        'header-bar': './src/app-header/index.js',
    } : {
        treeview: './examples/tree-view',
        datatable: './examples/data-table',
        orgunittree: './examples/org-unit-tree',
        orgunitselect: './examples/org-unit-select',
        sidebar: './examples/sidebar',
        iconpicker: './examples/icon-picker',
        formbuilder: './examples/form-builder',
        formulaeditor: './examples/formula-editor',
        headerbar: './examples/header-bar',
        legend: './examples/legend',
        translation: './examples/translation',
        expressionmanager: './examples/expression-manager',
        groupeditor: './examples/group-editor',
    },
    output: {
        library: 'Dhis2HeaderBar',
        path: path.join(__dirname, '/dist'),
        filename: `[name]-${version}.js`,
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: [/(node_modules)/],
                loader: 'babel-loader',
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader',
            },
            {
                test: /\.scss$/,
                loader: 'style-loader!css-loader!sass-loader',
            },
        ],
    },

    resolve: {
        alias: {
            react: __dirname + '/node_modules/react',
            'd2/lib/d2': __dirname + '/node_modules/d2/lib/d2',
        },
    },

    externals: isProduction() ? [
        {
            'react': 'React',
            'react-dom': 'ReactDOM',
            'react-addons-transition-group': 'var React.addons.TransitionGroup',
            'rx': 'Rx',
            'react-addons-create-fragment': 'var React.addons.createFragment',
            // 'd2/lib/d2': 'var d2',
            'lodash': 'var _',
            'lodash/fp': 'var fp',
            'lodash.merge': 'var _.merge',
            'lodash.throttle': 'var _.throttle',
            'lodash/merge': 'var _.merge',
        },
        /^lodash$/,
        /^lodash\/fp$/,
        /^react-addons/,
        /^react-dom$/,
        /^rx$/,
    ] : [],
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
