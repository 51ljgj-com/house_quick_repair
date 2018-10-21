/*global Vue:true*/
/*eslint no-undef: "error"*/
import App from './UserWrap'
import router from './router/user_wrap'
import VueResource from 'vue-resource'
import AjaxPlugin from './plugin/ajax'

Vue.prototype.SERVER_HOST = 'http://gdjzj.hzsdgames.com:8093'

Vue.use(VueResource)
Vue.use(AjaxPlugin)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
