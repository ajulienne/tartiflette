const path = require("path");

module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "tartiflette.js",
        library: "tartiflette",
        libraryTarget: "umd"
    },
    devtool: "source-map"
};