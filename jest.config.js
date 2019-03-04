module.exports = {
    "setupTestFrameworkScriptFile": "<rootDir>/config/setup.js",
    "testPathIgnorePatterns": [
        "/node_modules/",
        "<rootDir>/examples/",
        "<rootDir>/packages/core/lib/",
        "<rootDir>/packages/*/build/"
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
    "moduleNameMapper": {
        "^.+\\.css$": "<rootDir>/config/css-stub.js",
    },
};
