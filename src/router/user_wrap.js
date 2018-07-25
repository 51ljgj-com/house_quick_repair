/*global Vue:true*/
/*eslint no-undef: "error"*/
import Router from 'vue-router'
import IndexVue from '@/pageview/user_wrap/index'
import QuickOrdrVue from '@/pageview/user_wrap/quick_order'
import RegisterVue from '@/pageview/user_wrap/register'
import LoginVue from '@/pageview/user_wrap/login'
import UserVue from '@/pageview/user_wrap/user'
import UserOrdersVue from '@/pageview/user_wrap/user_center/user_orders'

Vue.use(Router)

let router =  new Router({
  linkActiveClass: 'weui-bar__item_on',
  routes: [
    {
      path: '/',
      redirect: '/index'
    }, {
      path: '/index',
      name: 'IndexVue',
      component: IndexVue
    }, {
      path: '/quick_order',
      name: 'QuickOrdrVue',
      component: QuickOrdrVue,
      meta: {hideNav: true, 'title': '直接预约'}
    }, {
      path: '/register',
      name: 'register',
      component: RegisterVue,
      meta: {hideNav: true, 'title': '注册'}
    }, {
      path: '/login',
      name: 'login',
      component: LoginVue,
      meta: {hideNav: true, 'title': '登录'}
    }, {
      path: '/user',
      name: 'userCenter',
      component: UserVue,
      meta: {hideNav: true, 'title': '个人中心'}
    }, {
      path: '/user/orders',
      name: 'userCenterOrders',
      component: UserOrdersVue,
      meta: {hideNav: true, 'title': '我的订单'}
    }
  ]
})

// router.beforeEach((to, from, next) => {
//   //获取本地缓存的token
//   //根据token 获取用户信息
//   //如果调用失败/无token跳转到登录。
//   //如果获取到用户信息页面跳转
//   if (document.body.classList.contains('fullscreen')) {
//     window.exitFullScreen()
//     document.body.classList.remove('fullscreen')
//     Bus.$emit('dashboardFullscreen', false)
//   }
//   if (to.path === '/login' || State.state.signed) {
//     return next()
//   }

//   let token = window.localStorage.getItem('auth_token')
//   if (!token) {
//     State.state.signed = false
//     return next('/login')
//   }

//   // 获取用户信息
//   let getUserInfo = Vue.http.get('/api/v1/user_info/').then(res => {
//     Vue.UserInfo = res.body
//     State.state.userInfo = res.body
//   })
//   // 获取用户权限
//   let getUserPermission = Vue.http.get('/api/v1/permission/core/').then(res => {
//     let data = res.body
//     let dataMap = {}
//     data.forEach(item => {
//       dataMap[item.key] = {
//         describe: item.describe,
//         active: item.active
//       }
//     })
//     Vue.UserPermission = dataMap
//     State.state.userPermission = dataMap
//   })
//   Promise.all([getUserInfo, getUserPermission]).then(() => {
//     State.state.signed = true
//     next()
//   }).catch(err => {
//     console.log(err)
//     State.state.signed = false
//     next('/login')
//   })
// })
export default router