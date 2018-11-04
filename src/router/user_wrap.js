/*global Vue:true*/
/*eslint no-undef: "error"*/
import Router from 'vue-router'
import IndexVue from '@/pageview/user_wrap/index'
import QuickOrdrVue from '@/pageview/user_wrap/quick_order'
import RegisterVue from '@/pageview/user_wrap/register'
import LoginVue from '@/pageview/user_wrap/login'
import UserVue from '@/pageview/user_wrap/user'
import DetailVue from '@/pageview/user_wrap/detail'
import GroupBuyVue from '@/pageview/user_wrap/group_buy.vue'
import AddHouseVue from '@/pageview/user_wrap/add_house.vue'
import OrderPayVue from '@/pageview/user_wrap/order_pay.vue'
import ContactVue from '@/pageview/user_wrap/contact.vue'
import AboutVue from '@/pageview/user_wrap/about.vue'
import GroupBuyDetailVue from '@/pageview/user_wrap/group_buy_detail.vue'
import UserOrdersVue from '@/pageview/user_wrap/user_center/user_orders'

Vue.use(Router)

let router = new Router({
  linkActiveClass: 'weui-bar__item_on',
  routes: [
    {
      path: '/',
      redirect: '/index'
    }, {
      path: '/index',
      name: 'IndexVue',
      component: IndexVue,
      meta: {nologin: true}
    }, {
      path: '/detail/:projectid',
      name: 'DetailVue',
      component: DetailVue,
      meta: {hideNav: true, 'title': '', nologin: true}
    }, {
      path: '/about',
      name: 'AboutVue',
      component: AboutVue,
      meta: {hideNav: true, 'title': '关于我们'}
    }, {
      path: '/contact',
      name: 'ContactVue',
      component: ContactVue,
      meta: {hideNav: true, 'title': '联系我们'}
    }, {
      path: '/quick_order',
      name: 'QuickOrdrVue',
      component: QuickOrdrVue,
      meta: {hideNav: true, 'title': '直接预约'}
    }, {
      path: '/group_buy',
      name: 'GroupBuyVue',
      component: GroupBuyVue,
      meta: {hideNav: true, 'title': '我要团购', nologin: true}
    }, {
      path: '/order_pay',
      name: 'OrderPayVue',
      component: OrderPayVue,
      meta: {hideNav: true, 'title': '支付订单'}
    }, {
      path: '/group_buy_detail/:groupid',
      name: 'GroupBuyDetailVue',
      component: GroupBuyDetailVue,
      meta: {hideNav: true, 'title': '填写团购订单'}
    }, {
      path: '/add_house',
      name: 'AddHouseVue',
      component: AddHouseVue,
      meta: {hideNav: true, 'title': '我要团购-添加小区'}
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

router.beforeEach((to, from, next) => {
  //获取本地缓存的token
  //根据token 获取用户信息
  //如果调用失败/无token跳转到登录。
  //如果获取到用户信息页面跳转
  if (to.path === '/login' || Vue.userInfo || to.meta.nologin) {
    return next()
  }

  let userInfo = JSON.parse(window.localStorage.getItem('userInfo'))
  if (!userInfo) {
    Vue.userInfo = null
    return next('/login')
  } else {
    Vue.userInfo = userInfo
    return next()
  }
})
export default router
