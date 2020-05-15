
module.exports = {

    lintOnSave: false,//取消ES6语法校验
    publicPath: process.env.NODE_ENV === "production" ? "./" : "/",
    outputDir: "dist", //打包目录
    productionSourceMap: false,
    devServer: {
        proxy: {
            '/todo': {
                target: 'http://127.0.0.1:5004/',
                changeOrigin: true,
                pathRewrite: {
                    '^/todo': ''
                }
            }
        }
    },

}

