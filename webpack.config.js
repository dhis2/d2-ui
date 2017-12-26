const isProduction = () => process.env.NODE_ENV === 'production';
const webpack = require('webpack');
const path = require('path');
require('colors');
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
        baseUrl: 'http://localhost:8080',
        authorization: 'Basic YWRtaW46ZGlzdHJpY3Q=', // admin:district
    };
}

const identity = (v) => v;
function log(req, res, opt) {
    req.headers.Authorization = dhisConfig.authorization;
    console.log('[PROXY]'.cyan.bold, req.method.green.bold, req.url.magenta, '=>'.dim, opt.target.dim);
}

module.exports = {
    context: __dirname,
    entry: isProduction() ? {
            'header-bar': './src/app-header/initHeaderBar.js',
        } : {
            treeview: './examples/tree-view',
            datatable: './examples/data-table',
            orgunittree: './examples/org-unit-tree',
            orgunitselect: './examples/org-unit-select',
            sharing: './examples/sharing',
            sidebar: './examples/sidebar',
            iconpicker: './examples/icon-picker',
            formbuilder: './examples/form-builder',
            // formulaeditor: './examples/formula-editor',
            headerbar: './examples/header-bar',
            'header-bar': './src/app-header/initHeaderBar.js',
            legend: './examples/legend',
            // translation: './examples/translation',
            expressionmanager: './examples/expression-manager',
            groupeditor: './examples/group-editor',
            periodpicker: './examples/period-picker',
            button: './examples/button',
            svgicon: './examples/svg-icon',
            textfield: './examples/text-field',
            selectfield: './examples/select-field',
            tabs: './examples/tabs',
            chip: './examples/chip',
            controlbar: './examples/controlbar',
        },
    devtool: 'source-map',
    output: {
        library: 'Dhis2HeaderBar',
        path: path.join(__dirname, '/dist'),
        filename: `[name].js`,
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
            'lodash': 'var _',
            'lodash/fp': 'var fp',
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
        isProduction() ? null :
            // Replace any occurance of DHIS_CONFIG with an object with baseUrl and authorization props
            new webpack.DefinePlugin({
                DHIS_CONFIG: JSON.stringify(dhisConfig),
            }),
        isProduction() ? null : new Visualizer(),
    ].filter(identity),
    devServer: {
        contentBase: [path.join(__dirname, '/examples/')],
        port: 8081,
        inline: true,
        compress: true,
        proxy: [
            { path: ['/api/', '/dhis-web-commons/', '/icons/'], target: dhisConfig.baseUrl, bypass: log },
        ],
    },
};
