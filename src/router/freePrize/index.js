export default [
  {
    path: '/freePrize',
    name: 'freePrize',
    component: () => import("@pages/freePrize"),
    children: [
      {
        path: "/freePrize",
        redirect: "/freePrize/now"
      },
      {
        path: "now",
        name: "now",
        component: () => import("@pages/freePrize/PrizeNow"),
        meta: {
          title: "幸运0元抽奖"
        },
      },
      {
        path: "over",
        name: "over",
        component: () => import("@pages/freePrize/PrizeOver"),
        meta: {
          title: "幸运0元抽奖"
        },
      },
      {
        path: 'now/error_1',
        name: 'now/error_1',
        component: () => import("@pages/freePrize/error_1"),
        meta: {
          title: "奖品错误"
        }
      },
      {
        path: 'over/error_1',
        name: 'over/error_1',
        component: () => import("@pages/freePrize/error_1"),
        meta: {
          title: "奖品错误"
        }
      },
    ]
  },
  {
    path: '/record',
    name: 'record',
    component: () => import("@pages/freePrize/record"),
    children: [
      {
        path: "/record",
        redirect: "/record/history",
      },
      {
        path: "history",
        name: "history",
        component: () => import("@pages/freePrize/recordHistory"),
        meta: {
          title: "个人记录"
        },
      },
      {
        path: "award",
        name: "award",
        component: () => import("@pages/freePrize/recordAward"),
        meta: {
          title: "个人记录"
        },
      },
      {
        path: 'history/error_2',
        name: 'history/error_2',
        component: () => import("@pages/freePrize/error_2"),
        meta: {
          title: "暂无记录"
        }
      },
      {
        path: 'award/error_2',
        name: 'award/error_2',
        component: () => import("@pages/freePrize/error_2"),
        meta: {
          title: "暂无记录"
        }
      },
      {
        path: 'history/error_1',
        name: 'history/error_1',
        component: () => import("@pages/freePrize/error_1"),
        meta: {
          title: "暂无记录"
        }
      },
      {
        path: 'award/error_1',
        name: 'award/error_1',
        component: () => import("@pages/freePrize/error_1"),
        meta: {
          title: "暂无记录"
        }
      },

    ]
  },
  // {
  //   path: '/error_1',
  //   name: 'error',
  //   component: () => import("@pages/freePrize/error_1"),
  //   meta: {
  //     title: "奖品错误"
  //   }
  // },
  // {
  //   path: '/error_2',
  //   name: 'error_2',
  //   component: () => import("@pages/freePrize/error_2"),
  //   meta: {
  //     title: "暂无记录"
  //   }
  // },
  {
    path: '/details/:id',
    name: 'details',
    props:true,
    component: () => import("@pages/freePrize/details"),
    meta: {
      title: "奖品详情"
    }
  },
  {
    path: '/before/:id/:config_id',
    name: 'before',
    props:true,
    component: () => import("@pages/freePrize/before"),
    meta: {
      title: "往期揭晓"
    }
  },
]