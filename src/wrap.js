/*global Vue:true*/
/*eslint no-undef: "error"*/
import App from './UserWrap'
import router from './router/user_wrap'
import VueResource from 'vue-resource'
import AjaxPlugin from './plugin/ajax'
import VueForm from 'vue-form'
import WXPay from './plugin/wxpay'
import OptRet from './component/wrap/operate_result.js'

Vue.prototype.SERVER_HOST = 'https://api.51ljgj.com'
Vue.prototype.$BUS = new Vue()
Vue.prototype.$showOptRet = OptRet.showResult
Vue.showOptRet = OptRet.showResult

Vue.use(VueResource)
Vue.use(AjaxPlugin)
Vue.use(VueForm)
Vue.use(WXPay)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});

(function() {
  let myFunction
  document.body.addEventListener('focusout', () => {
    myFunction && clearTimeout(myFunction)
    myFunction = setTimeout(function() {
      window.scrollTo({top: 0, left: 0, behavior: 'smooth'})
    }, 200)
  })
})()
