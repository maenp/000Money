import axios from 'axios';
import store from '@store'

const http = axios.create({
    timeout: 10000,
    withCredentials: true,//跨域设置  携带cookie不受限值
    baseURL: 'https://m.egou.com/api/',
    headers: {
        'content-type': 'application/x-www-form-urlencoded; charset=utf-8',
        // 'designVersion': mainUrlObj.designVersion || (androidObj ? androidObj.appVersionName : ''), //版本名称
        // 'version': mainUrlObj.version || (androidObj ? androidObj.appVersion : ''), //版本号
        // 'appPlatform': Bridge.isiOS ? 2 : 1, //平台  1-安卓   2-ios
        // "appChannel": androidObj ? androidObj.appChannel : '', //渠道
        // "appCheatId": window.android ? (window.android.getDeviceShuMeiId130 ? window.android.getDeviceShuMeiId130() : '') : ''
    }
})
http.jsonp = (url) => {//axios本版本不支持jsonp 自己拓展一个
    if(!url){
        console.error('Axios.JSONP 至少需要一个url参数!')
        return;
    }
    return new Promise((resolve,reject) => {
        window.jsonCallBack =(result) => {
            resolve(result)
        }
        var JSONP=document.createElement("script");
        JSONP.type="text/javascript";
        JSONP.src=`${url}&callback=jsonCallBack`;
        document.getElementsByTagName("head")[0].appendChild(JSONP);
        setTimeout(() => {
            document.getElementsByTagName("head")[0].removeChild(JSONP)
        },500)
    })
}


//拦截器
http.interceptors.request.use(config => {
    let defaultParams = { //设置默认参数
        term : store.state.term,
        mtag : store.state.deviceId,
        uid:store.state.userId,
        site : 1,
        chn:'',
    };
    config.data = Object.assign(defaultParams, config.data);
    if (config.method === "get") {
        config.params = { ...config.data };
    } else if (config.method === "post") {
        //config.headers["content-type"] = "application/x-www-form-urlencoded"
    }
    return config;
}, err => {
    return Promise.reject(err);
})


http.interceptors.response.use(res => {
    if (res.status === 200) {
        return res.data;
    }
})

export default http;