import Vue from 'vue'
import App from '@/App.vue'
import router from '@router'
import store from '@store'
import utils from '@utils/util'
Vue.prototype.$utils=utils

import 'c-swipe/dist/swipe.css';
import { Swipe, SwipeItem } from 'c-swipe';
Vue.component('swipe', Swipe);
Vue.component('swipe-item', SwipeItem);

store.commit("paramHandler")//获取设备的公共参数存在store中

Vue.filter("phoneHide",(value,length)=>{//手机号显示过滤器
  let phone=value.replace(/(\d{3})(\d{4})(\d{4})/,"$1****$3")
  if(phone.length>length)phone=phone.substr(0,length)+'...'
  return phone
})


Vue.filter("timestampToTime",(timestamp)=>{//时间戳转日期
  let date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
  let Y = date.getFullYear() + '-';
  let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
  let D = (date.getDate() < 10 ? '0'+date.getDate() : date.getDate()) + ' ';
  let h = (date.getHours() < 10 ? '0'+date.getHours() : date.getHours()) + ':';
  let m = (date.getMinutes() < 10 ? '0'+date.getMinutes() : date.getMinutes()) + ':';
  let s = (date.getSeconds() < 10 ? '0'+date.getSeconds() : date.getSeconds());
  return Y+M+D+h+m+s;
})


Vue.config.productionTip = false
// router.beforeEach((to, from, next) => {
//   /* 路由发生变化修改页面title */
//   if (to.meta.title) {
//     document.title = to.meta.title
//   }
//   next()
// })

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
