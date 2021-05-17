export default {
  namespaced: true,
  state: {
    cachedViews: [],
    visitedViews: []
  },
  mutations: {
    // 添加缓存
    ADD_CACHED_VIEW(state, view) {
      if (state.cachedViews.includes(view.name)) return
      if (view.meta && view.meta.keepAlive) {
        state.cachedViews.push(view.name)
      }
    },
    DEL_CACHED_VIEW(state, view) {
      // eslint-disable-next-line no-unused-vars
      for (const [i, v] of state.cachedViews.entries()) {
        if (v === view.name) {
          state.cachedViews.splice(i, 1)
          break
        }
      }
    },
    DEL_ALL_CACHED_VIEWS(state) {
      state.cachedViews = []
    }
  },
  actions: {
    addView(state, view) {
      state.commit('ADD_CACHED_VIEW', view)
    },
    delView(state, view) {
      state.commit('DEL_CACHED_VIEW', view)
    },
    delAllViews(state) {
      state.commit('DEL_ALL_CACHED_VIEWS')
    }
  },
  getters: {
    cachedViews(state) {
      return state.cachedViews
    },
    visitedViews(state) {
      return state.visitedViews
    }
  }
}
