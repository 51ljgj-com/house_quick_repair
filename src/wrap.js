/*global Vue:true*/
/*eslint no-undef: "error"*/
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import AjaxPlugin from './plugin/ajax'

Vue.use(VueResource)
Vue.use(AjaxPlugin)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
