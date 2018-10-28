<template lang="pug">
  .order-pay-wrapper
    .weui-msg
      .weui-msg__icon-area
        i.weui-icon-success.weui-icon_msg
      .weui-msg__text-area
        h2.weui-msg__title 订单提交成功,等待支付
    .weui-panel
      .weui-panel__hd 订单信息
      .weui-panel__bd
        .weui-media-box.weui-media-box_small-appmsg
          .weui-cells
            .weui-cell.weui-cell_access
              .weui-cell__hd 订单编号:
              .weui-cell__bd WXX2018050813523254
      .weui-panel__bd
        .weui-media-box.weui-media-box_small-appmsg
          .weui-cells
            .weui-cell.weui-cell_access
              .weui-cell__hd 购买产品:
              .weui-cell__bd 墙纸墙布(小区团购)
      .weui-panel__bd
        .weui-media-box.weui-media-box_small-appmsg
          .weui-cells
            .weui-cell.weui-cell_access
              .weui-cell__hd 支付总额:
              .weui-cell__bd 300.00元
    .weui-panel
      .weui-panel__hd 支付方式
      .weui-panel__bd
        .weui-media-box.weui-media-box_small-appmsg
          .weui-cells.weui-cells_radio
            label.weui-cell.weui-check__label(for="wxPay")
              .weui-cell__bd
                p 微信支付
              .weui-cell__ft
                input.weui-check(type="radio" name="radio1" id="wxPay")
                span.weui-icon-checked
    a.weui-btn.weui-btn_primary.go-pay() 去支付
</template>
<script>
export default {
  data: () => ({
  }),
  methods: {
    
  }
}
</script>

<style lang="scss">
.order-pay-wrapper {
  text-align: left;
  .weui-cell__bd {
    margin-left: 10px;
  }
  .go-pay {
    margin: 20px 10px;
  }
}
</style>
