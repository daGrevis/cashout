var ExtractTextPlugin = require("extract-text-webpack-plugin")

module.exports = {
    entry: "./frontend/app.jsx",
    // Empty string needed for importing .jsx without the extension.
    resolve: {
        extensions: ["", ".js", ".jsx"],
    },
    output: {
        path: __dirname + "/static",
        filename: "bundle.js",
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: "babel-loader",
                exclude: /node_modules/,
                query: {
                    presets: ["es2015", "react"],
                    plugins: ["transform-class-properties"],
                },
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract("css!sass"),
            },
        ],
    },
    plugins: [
        new ExtractTextPlugin("bundle.css"),
    ],
}
