const path = require('path');
const merge = require('webpack-merge');
const dev = require('./webpack.dev');
const prod = require('./webpack.prod');
// html插件
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
module.exports = (env) =>{
    let isDev = env.development;
    const base = {
        devtool:isDev?'cheap-module-eval-source-map':false,
        entry:'./src/index.js',
        output:{
            filename:'bundle.js',
            path:path.resolve(__dirname,'../dist')
        },
        plugins:[
            new HtmlWebpackPlugin({
                filename:'index.html', // 打包出来的文件名
                template:path.resolve(__dirname,'../public/index.html'),// 以这个文件为模板
                minify: !isDev && { // 压缩
                    removeAttributeQuotes: true, // 双引号都去掉
                    collapseWhitespace: true, // dist下产生的html 折叠 显示一行
                }
            }),
            new CleanWebpackPlugin(), // 每次打包之前都清空dist目录下的文件
        ],
        module:{
            rules:[
                {
                    test:/\.css$/,
                    use: ['style-loader',{
                            loader: 'css-loader',
                            options:{ // 给loader传递参数
                                // 如果css文件引入了其他文件@import
                                importLoaders: 2 // 1表示使用后面的一个即 'less-loader'，2表示使用后面的2个...以此类推
                            }
                    }, 'postcss-loader','less-loader']
                },
                {
                    test: /\.less$/,
                    use: ["style-loader", "css-loader", {
                        loader: "less-loader",
                        options: {
                            javascriptEnabled: true
                        }
                    }]
                },
                {
                    test: /\.js$/,
                    use: 'babel-loader'
                },
                {
                    test: /\.(jpe?g|png|gif)$/,
                    use: 'file-loader'
                },
                {
                    // 图标的转化
                    test: /\.(woff|ttf|eot|svg)$/,
                    use:{
                        loader:'file-loader'
                    }
                }
            ]
        },
        resolve: {
            alias:{
                Config: path.resolve(__dirname, '../src/config/'),
                Util: path.resolve(__dirname, '../src/util/'),
                Redux: path.resolve(__dirname, '../src/redux/'),
                Components: path.resolve(__dirname, '../src/components/'),
                Pages: path.resolve(__dirname, '../src/pages/'),
                Assets: path.resolve(__dirname, '../src/assets/')
            },
            extensions: [".js", ".jsx", ".json", ".css", ".less",]
        },
        optimization:{
            usedExports:true // 配置了之后在开发模式下，打包生成的bundle文件中会有提示文字没有用sum这个模块，但是还是会打包出来
        }
    }
    if(isDev){
        return merge(base,dev);
    }else{
        return merge(base,prod)
    }
}