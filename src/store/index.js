import Vue from 'vue'
import Vuex from 'vuex'
import freePrize from './freePrize'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        userId: '',
        term: '',
        deviceId: ''
    },
    mutations: {
        paramHandler(store, data) {
            store.userId = window.locJs ? window.locJs.getRuid() : 1642297,
            store.term = window.locJs ? window.locJs.getTerm() : 3,
            store.deviceId = window.locJs ? window.locJs.getDeviceID() : 22435454
        }
    },
    actions: {},
    modules: {
        freePrize
    }
})
