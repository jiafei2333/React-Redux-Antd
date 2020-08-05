const path = require('path');
const DllPlugin = require('webpack/lib/DllPlugin');

module.exports = {
    entry:['react','react-dom', 'react-redux'], // 将第三方模块react，react-dom等进行打包放到react.dll.js中
    mode: 'production',
    output:{
        filename: 'react.dll.js',
        path: path.resolve(__dirname, "../dll"),
        library: 'react', // 打包后接收自治性函数的名字叫react
        libraryTarget: 'var', // 打包后默认用var模式接收 这个打包后的自执行函数，这里也可以写“commonjs”  “commonjs2” “umd”  “this”...
    },
    plugins:[
        new DllPlugin({
            name: 'react',
            path: path.resolve(__dirname, '../dll/manifest.json') // 生成一个缓存列表
        })
    ]
}