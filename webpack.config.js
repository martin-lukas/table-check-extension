const path = require("path");
const ProgressPlugin = require("progress-webpack-plugin");

module.exports = {
    entry: {
        tableCheck: "./src/tableCheck.js"
    },
    output: {
        clean: true
    },
    plugins:[
        new ProgressPlugin()
    ]
};