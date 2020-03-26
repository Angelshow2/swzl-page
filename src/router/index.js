import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/main/statistics'
  },

  {
    path: '/main',
    component: Layout,
    name: 'Main',
    meta: { title: 'LOST & FOUND' },
    children: [
      {
        path: 'statistics',
        name: 'Statistics',
        component: () => import('@/views/statistics/index'),
        meta: { title: '统计分析' }
      },
      {
        path: 'losthall',
        name: 'Losthall',
        component: () => import('@/views/main/lostHall/index'),
        meta: { title: '失物大厅' }
      },
      {
        path: 'pickhall',
        name: 'Pickhall',
        component: () => import('@/views/main/pickHall/index'),
        meta: { title: '拾物大厅' }
      },
      {
        path: 'completed',
        name: 'Completed',
        component: () => import('@/views/main/completed/index'),
        meta: { title: '已认领归还' }
      }
    ]
  },

  {
    path: '/usercenter',
    component: Layout,
    name: 'Usercenter',
    meta: { title: '个人中心' },
    children: [
      {
        path: 'baseinfo',
        name: 'Baseinfo',
        component: () => import('@/views/userCenter/baseInfo/index'),
        meta: { title: '基本信息' }
      },
      {
        path: 'mypublish',
        name: 'Mypublish',
        component: () => import('@/views/userCenter/myPublish/index'),
        meta: { title: '我的发布' }
      },
      {
        path: 'myrecord',
        name: 'Myrecord',
        component: () => import('@/views/userCenter/myRecord/index'),
        meta: { title: '认领归还记录' }
      }
    ]
  },

  {
    path: '/system',
    component: Layout,
    name: 'System',
    meta: { title: '系统管理' },
    children: [
      {
        path: 'usermanagement',
        name: 'Usermanagement',
        component: () => import('@/views/system/userManagement/index'),
        meta: { title: '用户管理' }
      },
      {
        path: 'itemmanagement',
        name: 'Itemmanagement',
        component: () => import('@/views/system/itemManagement/index'),
        meta: { title: '物品管理' }
      },
      {
        path: 'dictmanagement',
        name: 'Dictmanagement',
        component: () => import('@/views/system/dictManagement/index'),
        meta: { title: '字典管理' }
      }
    ]
  },

  

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes,
  mode: 'history'
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
