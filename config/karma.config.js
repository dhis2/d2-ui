var path = require('path');
var webpack = require('webpack');

module.exports = function karmaConfigHandler(config) {
    config.set({
        browsers: ['PhantomJS'], // run in Headless browser PhantomJS
        singleRun: true,
        frameworks: [
            'mocha', // Test runner
            'chai',  // Assertion library
            'sinon', // Mocking library
            'chai-sinon', // Assertions for mocks and spies
        ],
        files: [
            '../node_modules/phantomjs-polyfill/bind-polyfill.js',
            '../node_modules/babel-polyfill/dist/polyfill.js',
            '../node_modules/jquery/dist/jquery.js',

            './test-setup.js',

            // '../test/**/*.test.js',
            '../test/indicator-expression-manager/*.test.js'
        ],
        preprocessors: {
            // '../test/tests.js': ['webpack', 'sourcemap'],
            // '../src/**/*.js': ['webpack', 'sourcemap'],
            '../test/**/*.test.js': ['webpack', 'sourcemap'],
        },
        reporters: ['spec', 'coverage'], // report results in this format
        coverageReporter: {
            type: 'lcov',
            dir: '../coverage',
            subdir: function simplifyBrowsername(browser) {
                // normalization process to keep a consistent browser name accross different OS
                return browser.toLowerCase().split(/[ /-]/)[0];
            },
        },
        webpack: { // kind of a copy of your webpack config
            module: {
                loaders: [
                    // transpile all files except testing sources with babel as usual
                    {
                        test: /\.js$/,
                        include: [
                            path.resolve('test'),
                            path.resolve('config/getRenderFunctionForComponent.js'),
                            path.resolve('config/inject-theme.js'),

                        ],
                        loader: 'babel',
                    },
                    // transpile and instrument only testing sources with isparta
                    {
                        test: /\.js$/,
                        include: path.resolve('src'),
                        loader: 'babel',
                        // loader: config.coverage === 'true' ? 'isparta' : 'babel',
                    },
                ],
            },

            plugins: [
                new webpack.SourceMapDevToolPlugin({
                    columns: true,
                    filename: '[file].map[query]',
                    lineToLine: true,
                    module: true,
                    append: '\n//# sourceMappingURL=/_karma_webpack_/[url]',
                }),
                new webpack.optimize.DedupePlugin(),
            ],
        },

        webpackServer: {
            // noInfo: true, // please don't spam the console when running in karma!
        },
    });
};
