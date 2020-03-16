import {getPrizeNum} from '@api/freePrize'

const state = {
    award_count: '5/5',
    lottery_time: 0,//这块时间和底部倒计时直连
    count: 5,


    // userId :window.locJs?window.locJs.getRuid():1642297,
    // term:window.locJs?window.locJs.getTerm():3,
    // deviceId:window.locJs?window.locJs.getDeviceID():22435454
}
const mutations = {
    getPrizeNumM(state, data) {
        state.award_count = data.award_count
        state.lottery_time = data.lottery_time / 1000
        state.count = data.count
    },
    getPrizeNumM_2(state, data) {
        state.award_count = data.award_count
        // state.lottery_time = data.lottery_time / 1000
    },
}
const actions = {
    getPrizeNumA({commit}, value) {
        getPrizeNum().then((data) => {
            if (data.code === 0) {
                commit("getPrizeNumM", data.data)
            }
        })
    },
}
export default {
    state,
    actions,
    mutations,
    namespaced: true
}