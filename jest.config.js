module.exports = {
    "setupTestFrameworkScriptFile": "<rootDir>/config/setup.js",
    "testPathIgnorePatterns": [
        "/node_modules/",
        "<rootDir>/lib/"
    ],
    "verbose": false,
    "transform": {
        "^.+\\.jsx$": "babel-jest",
        "^.+\\.js$": "babel-jest"
    },
    "moduleFileExtensions": [
        "js",
        "jsx"
    ],
    "moduleDirectories": [
        "node_modules"
    ],
    "transformIgnorePatterns": [
        "node_modules/(?!d2-ui)"
    ]
};
