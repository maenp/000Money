import Vue from 'vue'
import VueRouter from "vue-router"
import {statisticsHandler} from '@utils/statistics'
import freePrize from './freePrize'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: '/',
    redirect: "/freePrize",//重定向
    component: () => import("@pages/freePrize/PrizeNow"),
    meta: {
      title: "0元抽奖"
    },
  },
  ...freePrize,
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to,from,next)=>{
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  //
  statisticsHandler('//static1.egou.com/b=p/bi/js&f=alltracker.js',()=>{
    var _egtk = _egtk || { "site": 1 };
    (function () {
      var eg = document.createElement('script'); eg.type = 'text/javascript'; eg.async = true;
      eg.src = '//static1.egou.com/js/egoutracker.js';
      var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(eg, s);
    })();
    console.log('统计代码执行')
  })

  next()
})

export default router
