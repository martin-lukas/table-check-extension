const path = require("path");

module.exports = {
    mode: "development",
    devServer: {
        static: './public',
        open: true,
        hot: true
    },
    entry: {
        test: "./src/test.js"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, "dist"),
        clean: true
    },
    resolve: {
        modules: [
            path.resolve('./src'),
            path.resolve('./node_modules')
        ]
    }
};