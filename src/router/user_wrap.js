/*global Vue:true*/
/*eslint no-undef: "error"*/
import Router from 'vue-router'
import IndexVue from '@/pageview/user_wrap/index'

Vue.use(Router)

export default new Router({
  linkActiveClass: 'weui-bar__item_on',
  routes: [
    {
      path: '/',
      redirect: '/index'
    }, {
      path: '/index',
      name: 'IndexVue',
      component: IndexVue
    }
  ]
})
