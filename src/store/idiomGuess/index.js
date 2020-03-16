const state={
    idX:"",
    idiom_codeX:"",
    surplusCountX:"",//剩余次数
    correctCountX:"",//答对次数
    extraStatusX:"",//是否有额外奖励可领


    allCountX:"",//全部次数
    activityStatusX:"",//活动状态 0未开始，1进行中，2已结束

    extraAwardListX:[]

    // userId :window.locJs?window.locJs.getRuid():1642297,
    // term:window.locJs?window.locJs.getTerm():3,
    // deviceId:window.locJs?window.locJs.getDeviceID():22435454
}
const mutations={
    handleGetInfo(state,info){
        state.idX=info.id
        state.idiom_codeX=info.idiom_code
        state.surplusCountX=info.surplusCount
        state.correctCountX=info.correctCount
        state.extraStatusX=info.extraStatus
        state.extraAwardListX=info.awards

    },
    handleAcvityInfo(state,info){
        state.allCountX=info.allCount
        state.activityStatusX=info.activityStatus
    }
}
const actions={

}
export default{
    state,
    actions,
    mutations,
    namespaced:true
}