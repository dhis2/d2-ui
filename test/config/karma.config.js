module.exports = function karmaConfig( config ) {
    config.set({
        basePath: '../../',

        // Frameworks to use with karma
        frameworks: ['mocha', 'chai', 'sinon-chai', 'sinon', 'systemjs'],

        // How will the results of the tests be reported (coverage reporter generates the coverage)
        reporters: ['mocha', 'coverage'],

        preprocessors: {
            // source files, that you wanna generate coverage for
            // do not include tests or libraries
            // (these files will be instrumented by Istanbul)
            'src/**/*.js': ['babel', 'coverage'],
        },

        // optionally, configure the reporter
        coverageReporter: {
            type: 'lcov',
            dir: './coverage/',
            subdir: function flattenBrowserName(browser) {
                // normalization process to keep a consistent browser name accross different OS
                return browser.toLowerCase().split(/[ /-]/)[0];
            },
        },

        babelPreprocessor: {
            options: {
                sourceMap: 'inline',
            },
        },

        // Files that should be included by karma (that are not served by karma-systemjs)
        files: [
            './node_modules/phantomjs-polyfill/bind-polyfill.js',
            './node_modules/babel-core/browser-polyfill.js',

            './test/config/test-setup.js',
        ],

        // Config for karma-systemjs
        systemjs: {
            config: {
                'baseURL': '',
                'defaultJSExtensions': true,
                'transpiler': 'babel',
                'paths': {
                    'd2-ui/*': '../src/*',
                    'npm:*': 'node_modules/*',
                    'es6-module-loader': './node_modules/es6-module-loader/dist/es6-module-loader.js',
                    'systemjs': './node_modules/systemjs/dist/system.js',
                    'system-polyfills': './node_modules/systemjs/dist/system-polyfills.js',
                    'phantomjs-polyfill': './node_modules/phantomjs-polyfill/bind-polyfill.js',
                    'babel': './node_modules/babel-core/browser.js',
                    'material-ui/*': './node_modules/material-ui/*',
                    'npm:d2': 'node_modules/d2/d2',
                },
                'map': {
                    // use react with addons when requesting normal react so we have the same react instance in src and test
                    'react': 'npm:react/dist/react-with-addons',
                    'react/addons': 'npm:react/dist/react-with-addons',
                    'classnames': 'npm:classnames/index',
                    'd2-utils': 'npm:d2-utils/utils',
                    'd2-testutils': 'npm:d2-testutils/d2-testutils',
                    'loglevel': 'npm:loglevel/lib/loglevel',
                    'material-ui': 'npm:material-ui',
                    'react-stub-context': 'npm:react-stub-context/dist/index',
                    'd2-flux': 'npm:d2-flux',
                    'rx': 'npm:rx/index',
                    'lodash.isstring': 'npm:d2-flux/node_modules/lodash.isstring/index',
                    'd2': 'npm:d2',
                },
            },

            files: [
                './node_modules/react/**',
                './node_modules/classnames/**',
                './node_modules/d2-utils/**',
                './node_modules/d2-testutils/**',
                './node_modules/loglevel/lib/**',
                './node_modules/material-ui/**',
                './node_modules/react-stub-context/**',
                './node_modules/rx/**',
                './node_modules/rx/dist/**',
                './node_modules/d2-flux/**',
                './node_modules/d2-flux/node_modules/lodash.isstring/index.js',
                './node_modules/d2/**',
                './node_modules/d2/d2.js',

                // App source files
                'src/**/*.js',

                // Test files
                'test/**/*.test.js',
                'test/config/inject-theme.js',
            ],
        },

        logLevel: config.LOG_INFO,

        browsers: ['PhantomJS'],
        singleRun: false,
    });
};
