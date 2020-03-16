import http from './../utils/http';



export const getInfoApi = (data) => http({//获取成语题目接口
    method: "get",
    // url: "http://localhost:3000/data",
    url: "/rest.htm?method=act.cy.user.get",
    data,
})
export const activityInfoApi = (data) => http({//活动详情接口
    method: "get",
    // url: "http://localhost:3000/activityInfo",
    url: "/rest.htm?method=act.cy.act.get",
    data,
})
export const setAnswerApi = (data) => http({//猜成语答题
    method: "get",
    url: "/rest.htm?method=act.cy.guess.set",
    data,
})
export const setTaskApi = (data) => http({//领取任务奖励
    method: "get",
    url: "/rest.htm?method=act.cy.guess.task.set",
    data,
})

//底部广告
export const AdApi = () => http.jsonp('https://api.egou.com/rest?method=ad.list.get&site=0&names=APPACT_CHENGYU&term=2&v=2')

