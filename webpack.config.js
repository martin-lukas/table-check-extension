const path = require("path");

module.exports = {
    devServer: {
        port: 3000,
        static:  path.join(__dirname, "public"),
        open: false,
        hot: true
    },
    entry: {
        tableCheck: "./src/tableCheck.js"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ["babel-loader"]
            }
        ]
    },
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "dist"),
        clean: true
    },
    resolve: {
        modules: [
            path.resolve("./src"),
            path.resolve("./node_modules")
        ]
    }
};