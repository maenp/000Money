const path = require("path")
const Timestamp = new Date().getTime();
const isProduction = process.env.NODE_ENV === 'production';//判断当前环境
const staticSite = '//static1.egou.com/p/m_egou/hd/2020/freePrize/'

module.exports = {

    
    //跨域的配置
    // devServer:{
    //     proxy:{
    //         "/api":{
    //             target:"https://m.egou.com/",
    //             changeOrigin:true
    //         }
    //     }
    // },



    publicPath:isProduction? staticSite:'/',//打包后文件引用
    // publicPath:'./',

    productionSourceMap: false,//取消打包的map文件
    configureWebpack:  config =>{
        return{
            output: { // 输出重构  打包编译后的 文件名称  【模块名称.时间戳】
                filename: `js/[name].${Timestamp}.js`,//定义打包目录及文件名
                chunkFilename: `js/[name].${Timestamp}.js`,//同上
            },
            resolve: {
                alias: {
                    "@": path.join(__dirname, "./src"),
                    "@api": path.join(__dirname, "./src/api"),
                    "@common": path.join(__dirname, "./src/common"),
                    "@components": path.join(__dirname, "./src/components"),
                    "@lib": path.join(__dirname, "./src/lib"),
                    "@pages": path.join(__dirname, "./src/pages"),
                    "@router": path.join(__dirname, "./src/router"),
                    "@static": path.join(__dirname, "./src/static"),
                    "@store": path.join(__dirname, "./src/store"),
                    "@utils": path.join(__dirname, "./src/utils"),
                }
            }
        }

    },

    // configureWebpack: config => {
    //     if (isProduction) {
    //         config.externals = {
    //
    //         }
    //     }
    // }

}

