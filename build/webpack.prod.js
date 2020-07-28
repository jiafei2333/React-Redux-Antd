// 分析工具
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');
// css 压缩成一行
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
module.exports = {
    mode:'production',
    optimization: { // 优化项
        minimizer: [ // 可以放置压缩方案
            new OptimizeCssAssetsPlugin(), // css压缩，用了这个js也得手动压缩
            new TerserWebpackPlugin(), // 如果不写这行，js不会压缩成一行
        ]
    },
    plugins:[
        // new BundleAnalyzerPlugin(),
    ]
}