const state = {
  payList: JSON.parse(localStorage.getItem('payItemInfo')) || [],
  orderStatus: JSON.parse(localStorage.getItem('payItemInfo')) || false
}
const actions = {
  ASYNCSETPAY(state, data) {
    state.commit('SETPAY', data)
  }
}
const mutations = {
  SETPAY(state, data) {
    state.payList = data
    window.localStorage.setItem('payItemInfo', JSON.stringify(data))
  },
  SETSTATUS(state, status) {
    state.orderStatus = status
    window.localStorage.setItem('orderStatus', JSON.stringify(status))
  },
  DELETEITEM(state, index) {
    state.payList.splice(index, 1);
    window.localStorage.setItem('payItemInfo', JSON.stringify(state.payList))
  },
  DELETEALL(state) {
    state.payList = []
    window.localStorage.removeItem('payItemInfo');
  }
}
const getters = {

}
export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
