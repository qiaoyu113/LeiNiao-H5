// import { login, getInfo } from 'api/user'
import { loginByAccount } from 'api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'
// import router from '@/router'

const LOGIN = 'LOGIN'// 获取用户信息
const SetUserData = 'SetUserData'// 获取用户信息
const LOGOUT = 'LOGOUT'// 退出登录、清除用户数据
const USER_DATA = 'userDate'// 用户数据
const SETRESETPWD = 'SETRESETPWD'

export default {
  namespaced: true,
  state: {
    token: getToken() || '',
    user: JSON.parse(localStorage.getItem(USER_DATA) || null),
    loginStatus: localStorage.getItem('LoginStatusKey') || 0,
    resetPassword: false
  },
  mutations: {
    [LOGIN](state, data) {
      let userToken = data.token
      state.token = userToken
      setToken(userToken)
    },

    [SetUserData](state, userData = {}) {
      state.user = userData
      localStorage.setItem(USER_DATA, JSON.stringify(userData))
      localStorage.setItem('permission', state.user.stringPermissions)
    },
    [LOGOUT](state) {
      state.user = null
      state.token = null
      removeToken()
      localStorage.removeItem(USER_DATA)
      resetRouter()
    },
    [SETRESETPWD](state, status) {
      state.resetPassword = status
    }

  },
  actions: {
    async login(state, data) {
      try {
        data.$loading(true)
        let res = {}
        // 账号登录
        if (data.loginWay === 'account') {
          let { data: response } = await loginByAccount({
            username: data.loginForm.account,
            password: data.loginForm.password,
            systemtype: '1'
          })

          res = response
        }
        if (res.success) {
          if (!res.data.token) {
            data.$loading(false)
            return data.$fail(res.data.msg)
          }
          state.commit(LOGIN, res.data)
          state.commit(SetUserData, res.data)
          state.commit(SETRESETPWD, res.data.isWeakPwd)
          // return
          if (!res.data.isWeakPwd) {
            setTimeout(() => {
              const redirect = data.$route.query.redirect || '/'
              data.$router.replace({
                path: redirect
              })
            }, 20)
          }
        } else {
          data.$loading(false)
          data.$fail(res.errorMsg)
        }
      } catch (error) {
        console.log(`login error:${error}`)
      } finally {
        data.$loading(false)
      }
    },
    // get user info
    getInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        // getInfo(state.token).then(response => {
        //   const { data } = response

        //   if (!data) {
        //     // eslint-disable-next-line
        //     reject('Verification failed, please Login again.')
        //   }
        // commit(SetUserData, 'wt_admin')
        resolve('data')
        // }).catch(error => {
        //   reject(error)
        // })
      })
    }
  },
  getters: {
    token(state) {
      return state.token
    },
    user(state) {
      return state.user
    },
    getReset(state) {
      return state.resetPassword
    }
  }
}
