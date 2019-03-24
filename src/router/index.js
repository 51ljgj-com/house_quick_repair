/*global Vue:true*/
/*eslint no-undef: "error"*/
import Router from 'vue-router'
import IndexVue from '@/pageview/pc/index'
import GroupBuyingVue from '@/pageview/pc/group_shopping'
import ServiceDetailVue from '@/pageview/pc/detail.vue'
import OrderPayVue from '@/pageview/pc/pay.vue'
import UserCenterVue from '@/pageview/pc/user_center.vue'
import OrderListVue from '@/pageview/pc/user_center/order_list.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/index'
    }, {
      path: '/index/:anchor?',
      name: 'IndexVue',
      component: IndexVue
    }, {
      path: '/group_buy',
      name: 'GroupBuyingVue',
      component: GroupBuyingVue
    }, {
      path: '/service/detail/:detail_id',
      name: 'ServiceDetailVue',
      component: ServiceDetailVue
    }, {
      path: '/order/pay',
      name: 'OrderPayVue',
      component: OrderPayVue
    }, {
      path: '/user',
      name: 'UserCenterVue',
      component: UserCenterVue,
      redirect: '/user/orders',
      children: [{
        path: '/user/orders',
        name: 'OrderListVue',
        component: OrderListVue
      }]
    }
  ]
})