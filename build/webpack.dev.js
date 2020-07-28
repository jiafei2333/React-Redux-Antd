const path = require('path')
const webpack = require('webpack');
module.exports = {
    mode:'development',
    devServer:{
        // 更改静态文件目录位置（默认是放在根目录下）
        contentBase:path.resolve(__dirname,'../dist'), // 表示webpack启动服务会在dist目录下
        compress:true, // 开启gzip  可以提升页面返回的速度
        port:3000, // 更改端口号
        historyApiFallback: true,
        hot: true
    },
    plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
    ],
    resolve: {
        alias:{
            'react-dom': '@hot-loader/react-dom',
        }
    },
}