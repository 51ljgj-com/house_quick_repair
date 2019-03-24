<template lang="pug">
  .quick-order-wrap.bd-wrap
    .weui-cells__title  快速下单
    vue-form.weui-cells.weui-cells_form(:state="formstate")
      validate.weui-cell(:class="{'weui-cell_warn': formstate.contactsUserName && formstate.contactsUserName.$invalid}")
        .weui-cell__hd
          label.weui-label 姓名
        .weui-cell__bd
          input(class="weui-input" type="name" v-model="form.contactsUserName" placeholder="请输入真实姓名" name="contactsUserName" required)
      validate.weui-cell(:class="{'weui-cell_warn': formstate.phoneNo && formstate.phoneNo.$invalid}")
        .weui-cell__hd
          label.weui-label 电话
        .weui-cell__bd
          input(class="weui-input" type="tel" v-model="form.phoneNo" placeholder="请输入11位手机号" name="phoneNo" pattern="\\d{11}")
        weui-cell__ft
          i.weui-icon-warn
      validate.weui-cell(:class="{'weui-cell_warn': !form.orderAddress1}")
        .weui-cell__hd
          label.weui-label 选择区县
        .weui-cell__bd
          input#addr(class="weui-input" @click="showAddr()" type="text" placeholder="请选择区县" name="addr")
        weui-cell__ft
          i.weui-icon-warn
      validate.weui-cell(:class="{'weui-cell_warn': formstate.infoAddr && formstate.infoAddr.$invalid}")
        .weui-cell__hd
          label.weui-label 详细地址
        .weui-cell__bd
          input(class="weui-input" type="text" v-model="form.orderAddress2" placeholder="请输入您的详细地址" name="infoAddr" required)
        weui-cell__ft
          i.weui-icon-warn
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
</template>
<script>
export default {
  data: () => ({
    form: {
      contactsUserName: '',
      isGroupOrder: false,
      phoneNo: '',
      orderContent: '',
      orderAddress: '',
      orderAddress1: '',
      orderAddress2: '',
      houseName: '',
      orderDescription: ''
    },
    formstate: {}
  }),
  methods: {
    submit() {
      if(this.formstate.$invalid) return;
      this.form.orderAddress = this.form.orderAddress1 + this.form.orderAddress2;
      let params = Object.assign({}, this.form, {token: Vue.userInfo.token, orderContent: this.$route.query.orderContent})
      this.$http.post('/api/order/createOrder', params).then(res => {
        res = res.body;
        if (res.code) return;
        this.$showOptRet();
      })
    },

    showAddr() {
      $("#addr").cityPicker({
        title: "选择区县",
        onChange: (picker, values, displayValues) => {
          this.form.orderAddress1 = displayValues.join(' ')
        }
      });
    }
  },
  components: {
  },
  mounted() {
    this.showAddr();
  }
}
</script>

<style lang="scss">
</style>
