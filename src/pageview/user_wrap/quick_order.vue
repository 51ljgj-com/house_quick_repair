<template lang="pug">
  .quick-order-wrap.bd-wrap
    .weui-cells__title  快速下单
    .weui-cells.weui-cells_form
      .weui-cell
        .weui-cell__hd
          label.weui-label 姓名
        .weui-cell__bd
          input(class="weui-input" type="name" v-model="form.contactsUserName" placeholder="请输入真实姓名")
      .weui-cell
        .weui-cell__hd
          label.weui-label 电话
        .weui-cell__bd
          input(class="weui-input" type="tel" v-model="form.phoneNo" placeholder="请输入正确的电话")
      .weui-cell
        .weui-cell__hd
          label.weui-label 地址
        .weui-cell__bd
          input(class="weui-input" type="name" v-model="form.orderAddress" placeholder="请输入详细地址")
      .weui-cell
        .weui-cell__hd
          label.weui-label 小区
        .weui-cell__bd
          input(class="weui-input" type="name" v-model="form.houseName" placeholder="请输入小区名字")
      .weui-cell
        .weui-cell__hd
          label.weui-label 需求描述
        .weui-cell__bd
          textarea.weui-textarea(row="5" v-model="form.orderDescription" placeholder="请输入简要的需求说明")
    .weui-btn-area
      a.weui-btn.weui-btn_primary(@click.stop="submit()") 确定
    operate-ret(:is-show="operateRet.isShow" :msg="operateRet.msg" :btns="operateRet.btns")
</template>
<script>
import OperateRet from '../../component/wrap/operate_result.vue';
export default {
  data: () => ({
    form: {
      contactsUserName: '',
      isGroupOrder: false,
      phoneNo: '',
      orderContent: '',
      orderAddress: '',
      houseName: '',
      orderDescription: ''
    },
    operateRet: {
      isShow: {
        type: Boolean,
        default: false
      },
      msg: '预约成功',
      btns: [{
        txt: '返回主页',
        cb() {
          location.href = '/wrap.html';
        }
      }, {
        txt: '前往个人订单页',
        cb() {
          location.href = '#/user/orders'
        }
      }]
    }
  }),
  methods: {
    submit() {
      if(['contactsUserName', 'phoneNo', 'orderAddress'].some(i => !this.form[i].trim())) {
        return;
      }
      if (!/^\d{11}$/.test(this.form.phoneNo)) {
        return;
      }
      let params = Object.assign({token: Vue.userInfo.token}, this.form)
      this.$http.post('/api/order/createOrder', params).then(res => {
        res = res.body;
        if (res.code) return;
        this.operateRet.isShow = true;
      })
    }
  },
  components: {
    'operate-ret': OperateRet
  }
}
</script>

<style lang="scss">
</style>
