<template lang="pug">
  .user-orders-wrap.bd-wrap
    h2 我的订单
    .weui-form-preview
      .weui-form-preview__hd
        label.weui-form-preview__label 付款金额
        em.weui-form-preview__value ¥2400.00
      .weui-form-preview__bd
        .weui-form-preview__item
          label.weui-form-preview__label 项目
          span.weui-form-preview__value 阳台贴砖
        .weui-form-preview__item
          label.weui-form-preview__label 状态：
          span.weui-form-preview__value(style="color: red") 施工中
        .weui-form-preview__item
          label.weui-form-preview__label 订单编号
          span.weui-form-preview__value WXX2018050813523254
        .weui-form-preview__item
          label.weui-form-preview__label 对接师傅
          span.weui-form-preview__value 周公
        .weui-form-preview__item
          label.weui-form-preview__label 下单时间
          span.weui-form-preview__value 2018-05-09 15：45:95
      .weui-form-preview__ft
          button.weui-form-preview__btn.weui-form-preview__btn_default 客服
          button.weui-form-preview__btn.weui-form-preview__btn_primary(type="submit") 支付

    .weui-form-preview
      .weui-form-preview__hd
        label.weui-form-preview__label 付款金额
        em.weui-form-preview__value ¥2400.00
      .weui-form-preview__bd
        .weui-form-preview__item
          label.weui-form-preview__label 项目
          span.weui-form-preview__value 阳台贴砖
        .weui-form-preview__item
          label.weui-form-preview__label 状态：
          span.weui-form-preview__value(style="color: green") 已完成
        .weui-form-preview__item
          label.weui-form-preview__label 订单编号
          span.weui-form-preview__value WXX2018050813523254
        .weui-form-preview__item
          label.weui-form-preview__label 对接师傅
          span.weui-form-preview__value 周公
        .weui-form-preview__item
          label.weui-form-preview__label 下单时间
          span.weui-form-preview__value 2018-05-09 15：45:95
      .weui-form-preview__ft
          button.weui-form-preview__btn.weui-form-preview__btn_default 申请售后
          button.weui-form-preview__btn.weui-form-preview__btn_default 客服
          button.weui-form-preview__btn.weui-form-preview__btn_default 评价
   
</template>
<script>
export default {
  data: () => ({
  }),
  methods: {
  },
  mounted() {
    this.$http.get('/api/user/myOrders?token=' + Vue.userInfo.token).then(res => {
      console.log(res);
    })
  }
}
</script>

<style lang="scss" scoped>
  h2 {
    font-size: 16px;
    padding: 10px 15px;
  }
  .weui-form-preview {
    margin-bottom: 10px;
  }
</style>
