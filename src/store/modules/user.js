import { login, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter, asyncRouterMap, constantRoutes, notFound } from '@/router'
import router from '@/router'


const state = {
  token: getToken(),
  name: localStorage.getItem("name"),
  accountid: localStorage.getItem("accountid"),
  role: localStorage.getItem("auth"),
  routes: []
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_ACCOUNTID: (state, accountid) => {
    state.accountid = accountid
  },
  SET_AUTH: (state, role) => {
    state.role = role
  },
  SET_ROUTES: (state, flag) => {
    if(flag) {
      state.routes = constantRoutes.concat(asyncRouterMap)
    } else {
      console.log(notFound)
      state.routes = constantRoutes.concat(notFound)
    }
    
  }
  
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ account_id: username.trim(), password: password }).then(response => {
        const { data } = response
        console.log(response)
        commit('SET_TOKEN', data.token)
        commit('SET_AUTH', data.role)
        commit('SET_NAME', data.name)
        commit('SET_ACCOUNTID', data.accountid)
        localStorage.setItem("accountid",data.accountid);
        localStorage.setItem("name",data.name);
        localStorage.setItem("auth",data.role);
        setToken(data.token)
        
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  getRoutes({ commit }) {
    return new Promise((resolve, reject) => {
      if(state.role === 'super_admin' || state.role === 'admin') {
        commit('SET_ROUTES', true)
        resolve({routes: state.routes, flag: true})
      } else {
        commit('SET_ROUTES', false)
        resolve({routes: state.routes, flag: false})
      }
      
        
    })
  },


  // get user info
  // getInfo({ commit, state }) {
  //   return new Promise((resolve, reject) => {
  //     getInfo(state.token).then(response => {
  //       const { data } = response
  //       if (!data) {
  //         reject('Verification failed, please Login again.')
  //       }
  //       const { name, avatar } = data

  //       commit('SET_NAME', name)
  //       commit('SET_AVATAR', avatar)
  //       resolve(data)
  //     }).catch(error => {
  //       reject(error)
  //     })
  //   })
  // },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      removeToken()
      resetRouter()
      localStorage.removeItem('name')
      localStorage.removeItem('accountid')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

