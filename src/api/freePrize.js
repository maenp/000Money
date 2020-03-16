import http from './../utils/http';


/*
* status 1 进行中 2 已结束  --
* page_no 第几页
* page_size 一页多少条
* */
export const getHomeNowList = (data) => http({//获取奖品列表
    method: "get",
    url: "rest.htm?method=act.zero.award.list.get",
    data,
    // url: "http://localhost:3000/list",
    // baseURL:""
})
export const getPrizeNum = (data) => http({//抽奖次数获取
    method: "get",
    url: "rest.htm?method=act.zero.award.user.get",
    // url: " http://localhost:3000/time",
    data,
    // baseURL:""
})
/*
*  awardId  奖品id  --
* */
export const setPrize = (data) => http({//抽奖
    method: "get",
    url: "rest.htm?method=act.zero.award.set",
    data,
})
export const getScrollList = (data) => http({//首页滚动数据
    method: "get",
    url: "rest.htm?method=act.zero.award.scroll.get",
    data,
})
/*
* status 1 参与记录 2 中奖记录  --
* page_no 第几页
* page_size 一页多少条
* */
export const getRecordAwardList = (data) => http({//个人历史记录
    method: "get",
    url: "rest.htm?method=act.zero.log.list.get",
    data,
})
export const getPrizeDetail = (data) => http({//奖品详情页
    method: "get",
    url: "rest.htm?method=act.zero.award.info.get",
    data,
})
/*
* rc_phone手机，--
* rc_name姓名，--
* rc_address地址，--
* award_id奖品id--
* */
export const setAwardSite = (data) => http({//添加中奖地址
    method: "get",
    url: "rest.htm?method=act.zero.award.send.set",
    data,
})
export const getSpeed = (data) => http({//进度板块状态
    method: "get",
    url: "rest.htm?method=act.zero.award.speed.get",
    data,
})
/*
*award_id 奖品id--
* */
export const getComputeInfo = (data) => http({//获取计算详情
    method: "get",
    url: "rest.htm?method=act.zero.award.compute.get",
    data,
})


// export const getAdApi = () => http.jsonp('http://static1.egou.com/p/m_egou/hd/2020/adId/adId.json?type=1')
// export const getAdApi = () => http.jsonp('http://www.autohome.com.cn/ashx/AjaxIndexCarFind.ashx?type=1')