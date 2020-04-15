import { asyncRouterMap, constantRouterMap } from '@/router'
import user from '../modules/user'
import getters from '../getters'

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param routes asyncRouterMap
 * @param roles
 */
function filterAsyncRouter(routes, roles) {
  const res = []
  const urlList = roles.map(item => item.path ? `/${item.path}` : '') // 遍历出服务端的路由的url，匹配使用
  console.log('urlList', urlList)
  const urlListtwo = ['/system', '/system/user',  '/system/role'] // 模拟说句
  routes && routes.forEach(route => {
    const index = urlListtwo.indexOf(route.meta.fullPath) // 从服务端的路由查找到的下标
    if (index === -1) return
    const newRoute = {
      ...route
      // meta: {
      //   ...route.meta,
      //   icon: roles[index].icon,
      //   title: roles[index].name
      // }
    }

    if (route.children && route.children.length) {
      newRoute.children = filterAsyncRouter(route.children, roles)
    } else {
      delete newRoute.children
    }

    res.push(newRoute)
  })
  return res
}

// constantRouterMap.concat(routers)
// function Arrlistconcat(arr, arr2) {
//   console.log(arr)
//   return arr.concat(arr2)
// }
const permission = {
  state: {
    // routers: getters.filterMenuBySystem(user.state.system, constantRouterMap),
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    }
  },
  actions: {
    GenerateRoutes({ commit }, data) {
      return new Promise(resolve => {
        commit('SET_ROUTERS', [
          ...filterAsyncRouter(asyncRouterMap, data),
          // ...asyncRouterMap,
          {
            path: '*',
            redirect: '/404',
            hidden: true
          }
        ])
        resolve()
      })
    }

  },
  getters: {
    routers: (state) => {
      const systemCode = user.state.system
      const menu = []
      constantRouterMap.forEach((item, index, arr) => {
        if (item.systemType === systemCode) {
          menu.push(item)
        }
      })
      return menu
    }
  }
}
// console.log(permission, "__________permission")
export default permission
