<template lang="pug">
.order-submit-wrapper
  h1 核对订单信息并支付
  .list
    .item
      h2 订单信息
      .cont
        p 订单编号 : LJGJ2018050813523254
        p 购买产品 : 墙纸墙布安装(某某小区团购)
        p 支付总额 : 300.00元
    .item
      h2 服务详情
      .cont
        p xxx服务
    .item 
      h2 支付方式
      .cont
        el-radio-group(v-model="payType")
          el-radio(label="weixin")
            span.radio-icon.weixin 微信
          el-radio(label="alipay")
            span.radio-icon.alipay 支付宝
  el-button(type="danger") 去支付
</template>

<script>

export default {
  data: () => ({
    payType: 'weixin'
  }),
  components: {
  }
}
</script>

<style lang="scss">
#bd.order-submit-wrapper {
  width: 1024px;
  margin: auto;
  padding: 50px 0;
  h1 {
    font-size: 24px;
    color: #333;
  }
  .list {
    border: 1px solid #ccc;
    padding: 10px;
    margin: 20px 0;

    .item {
      border-bottom: 1px solid #ccc;
      padding: 10px;
      &:last-child {
        border-bottom: none;
      }

      h2 {
        font-size: 16px;
        font-weight: bold;
        color: #999;
      }
      .cont {
        padding: 0 10px;
      }
    }
  }
  .radio-icon {
    &:before {
      width: 1.2em;
      height: 1.2em;
      background-size: contain;
      background-position: center;
      content: ' ';
      display: inline-block;
      vertical-align: middle;
      margin-right: 3px;
    }
    &.weixin:before {
      background-image: url(/static/img/weixin_icon.png);
    }
    &.alipay:before {
      background-image: url(/static/img/alipay_icon.png);
    }
  }
}
</style>
