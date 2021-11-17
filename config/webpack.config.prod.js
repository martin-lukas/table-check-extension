const path = require("path");

module.exports = {
    entry: {
        test: ".src/test.js "
        // tableCheckboxes: "./src/ui-extensions/table-checkboxes/tableCheckboxes.ts",
    },
    mode: "development",
    devServer: {
        port: 3000
    },
    // module: {
    //     rules: [
    //         {
    //             test: /\.tsx?$/,
    //             use: "ts-loader",
    //             exclude: /node_modules/,
    //         }
    //     ]
    // },
    // resolve: {
    //     extensions: [".ts", "tsx"]
    // },
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "dist"),
    }
};