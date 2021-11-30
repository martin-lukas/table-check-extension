const path = require("path");

module.exports = {
    mode: "development",
    devServer: {
        static: './public',
        open: false,
        hot: true
    },
    entry: {
        test: "./src/test.ts"
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
            },
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/,
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