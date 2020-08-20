const path = require("path");
// 分析工具
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');
// css 压缩成一行
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
// 拷贝文件
const CopyWebpackPlugin = require('copy-webpack-plugin');
// Sentry
// const SentryPlugin = require('webpack-sentry-plugin');
const SentryPlugin = require('@sentry/webpack-plugin');

module.exports = {
    mode:'production',
    optimization: { // 优化项
        minimizer: [ // 可以放置压缩方案
            new OptimizeCssAssetsPlugin(), // css压缩，用了这个js也得手动压缩
            // 官方文档 https://github.com/terser/terser
            new TerserWebpackPlugin({
                terserOptions:{
                    compress: {
                        drop_console: true // 去掉所有的console输出
                    }
                }
                
            }), // 如果不写这行，js不会压缩成一行
        ],
        // splitChunks: {
        //     // initial 只操作同步的，all 所有的，async异步的（默认）
        //     chunks: 'async', // 默认支持异步的代码分割import()
        //     minSize: 30000, // 文件超过30k 就会抽离
        //     maxSize: 0,  // 没有最大上限
        //     minChunks: 1, // 最少模块引用一次才抽离
        //     maxAsyncRequests: 5, // 最大异步请求数，最多5个
        //     maxInitialRequests: 3, // 最大初始化请求数，即最多首屏加载3个请求
        //     automaticNameDelimiter: '~', // 抽离的命名分隔符 xxx~a~b (如果是a、b文件引用)
        //     automaticNameMaxLength: 30, // 名字最大长度
        //     name: true,
        //     cacheGroups: { // 缓存组  这里面也可以配置上面的配置
        //         vendors: { // 先抽离第三方
        //             test: /[\\/]node_modules[\\/]|(lodash)/,
        //             priority: -1
        //         },
        //         react:{
        //             test: /[\\/]node_modules[\\/](react|react-dom)/,
        //             priority: -2, 
        //         },
        //         default: { 
        //             minChunks: 2,
        //             priority: -20, // 优先级, -2比 -20大
        //             reuseExistingChunk: true
        //         }
        //     }
        // }
    },
    plugins:[
        // new BundleAnalyzerPlugin(), // 打包分析
        // 生产环境下拷贝web.config 到dist下
        new CopyWebpackPlugin({
            patterns: [
              { from: path.join( __dirname, '../public', 'web.config'), to: path.join( __dirname, '../dist', 'web.config') },
            ],
        }),
        // // 配置Sentry sourceMap
        // new SentryPlugin({
        //     organization: 'sentry',
        //     project: 'react',
        //     apiKey: 'f4530694b9584adab7c4d8622ae7550f876262e1a2604196a31d753fd6feefb6',
        //     include: /\.js.map$/,
        //     release: "production@1.0.3",
        //     // 上传完毕之后删除source map文件
        //     deleteAfterCompile: true
        // })
        // new SentryPlugin ({
        //     release: "production@1.0.5",//版本号
        //     include: path.join(__dirname,'../dist/'), //需要上传到sentry服务器的资源目录,会自动匹配js 以及map文件
        //     ignore: ['node_modules'], //忽略文件目录,当然我们在inlcude中制定了文件路径,这个忽略目录可以不加
        //     configFile :'.sentryclirc',  
        //     urlPrefix : "~/",    //  线上对应的url资源的相对路径 比如我的域名是 http://XXX  .com/,静态资源都在 / 文件夹里面,
        // })
    ]
}
