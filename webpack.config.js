const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
    entry: {
        app: './src/index.js',
        print: './src/print.js'
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: '管理输出'
        })
    ],
    output: {
        filename: "[name].bundle.js", // 根据入口名动态的生成bundle名
        path: path.resolve(__dirname, "dist")
    },
};
