import Vue from 'vue'
import OperateRet from './operate_result.vue'

Vue.component('operate-ret', OperateRet)
function result(opt) {
  var container = document.createElement('div')
  document.body.append(container)
  var data = Object.assign({}, {
    isShow: true,
    msg: '恭喜您预约成功，工作人员会在2小时内联系您，请保持手机畅通~',
    btns: [{
      txt: '返回主页',
      cb() {
        location.href = '/wrap.html'
      }
    }, {
      txt: '前往个人订单页',
      cb() {
        location.href = '#/user/orders'
      }
    }]
  }, opt)

  data.btns.map(i => {
    if (i.cb) {
      var fn = i.cb
      i.cb = () => {
        document.body.removeChild(document.querySelector('#optResultWrap'))
        fn()
      }
    }
  })
  console.log(123123)
  return new Vue({
    el: container,
    replace: false,
    template: `<operate-ret :is-show="operateRet.isShow" :msg="operateRet.msg" :btns="operateRet.btns"></operate-ret>`,
    data: {
      operateRet: data
    },
    methods: {
    }
  })
}

export default {
  showResult: result
}
