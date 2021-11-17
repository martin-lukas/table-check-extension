const path = require("path");

module.exports = {
    mode: "development",
    devServer: {
        static: './public',
    },
    entry: "./src/test.js",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist"),
    }
};