/*global Vue:true*/
/*eslint no-undef: "error"*/
import Router from 'vue-router'
import IndexVue from '@/pageview/index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'IndexVue',
      component: IndexVue
    }
  ]
})
