<template lang="pug">
  .quick-order-wrap.bd-wrap
    .weui-cells__title  新增您所在小区
    vue-form.weui-cells.weui-cells_form(:state="formstate")
      validate.weui-cell(:class="{'weui-cell_warn': formstate.name && formstate.name.$invalid}")
        .weui-cell__hd
          label.weui-label 小区名称
        .weui-cell__bd
          input(class="weui-input" type="name" v-model="form.houseName" placeholder="请输入小区名称" name="name" required)
        weui-cell__ft
          i.weui-icon-warn
      validate.weui-cell(:class="{'weui-cell_warn': formstate.addr && formstate.addr.$invalid}")
        .weui-cell__hd
          label.weui-label 楼盘地址
        .weui-cell__bd
          input(class="weui-input" type="tel" v-model="form.houseAddress" placeholder="请输入楼盘地址" name="addr" required)
        weui-cell__ft
          i.weui-icon-warn
    .weui-btn-area
      a.weui-btn.weui-btn_primary(@click.stop="submit()") 确定
    operate-ret(:is-show="operateRet.isShow" :msg="operateRet.msg" :btns="operateRet.btns")
</template>
<script>
import OperateRet from '../../component/wrap/operate_result.vue';
export default {
  data: () => ({
    form: {
      houseName: '',
      houseAddress: '',
    },
    formstate: {},
    
    operateRet: {
      isShow: {
        type: Boolean,
        default: false
      },
      msg: '恭喜您创建成功，<br>工作人员会尽快审核并完善信息发布出来~',
      btns: [{
        txt: '返回团购列表',
        cb() {
          location.href = '#/group_buy';
        }
      }, {
        txt: '前往首页',
        cb() {
          location.href = '/wrap.html'
        }
      }]
    }
  }),
  methods: {
    submit() {
      if(this.formstate.$invalid) return;
      let params = Object.assign({}, this.form)
      this.$http.post('/api/group/createOneGroupItem', params).then(res => {
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
