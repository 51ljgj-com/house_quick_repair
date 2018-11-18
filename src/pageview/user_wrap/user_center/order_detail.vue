<template lang="pug">
  .user-orders-detail-wrap(v-if="info")
    .title-status(:data-status="info.orderBaseInfo.orderStatus >= 4 ? 'done': 'doing'")
      i.weui-icon_msg(:class="info.orderBaseInfo.orderStatus >= 4 ? 'weui-icon-success': 'weui-icon-waiting'")
      p.text {{statusText[info.orderBaseInfo.orderStatus]}}
    .weui-panel.weui-panel_access
      .weui-panel__hd 订单基本信息
      .weui-panel__bd
        .weui-media-box
          label.weui-form-preview__label 订单编号
          span.weui-form-preview__value {{info.orderid}}
        .weui-media-box
          label.weui-form-preview__label 订单类别
          span.weui-form-preview__value {{info.orderBaseInfo.orderContent}}
        .weui-media-box
          label.weui-form-preview__label 下单时间
          span.weui-form-preview__value {{info.orderBaseInfo.orderTime}}
        .weui-media-box
          label.weui-form-preview__label 订单地址
          span.weui-form-preview__value {{info.orderBaseInfo.orderAddress}}
      .weui-panel__ft

    .weui-panel.weui-panel_access(v-if="info.orderBaseInfo.orderStatus != 1")
      .weui-panel__hd 订单金额
      .weui-panel__bd
        .weui-media-box
          label.weui-form-preview__label 订单总额
          span.weui-form-preview__value {{info.orderAmountInfo.orderAmount}}
        .weui-media-box(v-for="coupon in info.orderAmountInfo.orderDiscountList")
          label.weui-form-preview__label {{coupon.discountTitle}}
          span.weui-form-preview__value {{coupon.discountAmount}}
      .weui-panel__ft
        .weui-cell__bd(v-if="info.orderBaseInfo.orderStatus == 2 || info.orderBaseInfo.orderStatus == 3")
          .weui-cell(style="color: red;text-align: right") 待付款: ¥{{info.orderAmountInfo.orderAmount}}
        .weui-cell__bd(v-else)
          .weui-cell(style="color: green;text-align: right") 实付款: ¥{{info.orderAmountInfo.orderAmount}}
    
    .weui-panel.weui-panel_access(v-if="info.orderBaseInfo.orderStatus != 1")
      .weui-panel__hd 订单施工内容
      .weui-panel__bd
        .weui-media-box
          p.weui-media-box__desc(v-for="work in info.orderWorkList" v-html="work.orderWork")
      .weui-panel__ft

    .detail-btns
      .weui-panel.weui-panel_access(v-if="info.orderBaseInfo.orderStatus == 1 || info.orderBaseInfo.orderStatus == 5")
          button.weui-form-preview__btn.weui-form-preview__btn_default 客服
      .weui-panel.weui-panel_access(v-else-if="info.orderBaseInfo.orderStatus == 2 || info.orderBaseInfo.orderStatus == 3")
          button.weui-form-preview__btn.weui-form-preview__btn_default 客服
          button.weui-form-preview__btn.weui-form-preview__btn_primary(type="submit") 支付
      .weui-panel.weui-panel_access(v-else)
          button.weui-form-preview__btn.weui-form-preview__btn_default 客服
          button.weui-form-preview__btn.weui-form-preview__btn_default 评价
</template>
<script>
import {statusText} from '@/router/config.js';
export default {
  data: () => ({
    info: null,
    statusText
  }),
  methods: {
  },
  mounted() {
    this.$http.get(`/api/order/getOrderInfo?token=${Vue.userInfo.token}&orderid=${this.$route.params.id}`).then(res => {
      console.log(res)
      if (res.body && !res.body.code) {
        this.info = res.body.data;
        this.info.orderWorkList = this.info.orderWorkList.map(i => {
          i.orderWork = i.orderWork.replace('\\n', '<br>')
          return i;
        })
      } else {
        
      }
    })
  }
}
</script>

<style lang="scss" scoped>
  .user-orders-detail-wrap {
    text-align: left;
    font-size: 14px;
  }
  .weui-cell:before {
    display: block;
  }
  .weui-media-box__desc {
    -webkit-line-clamp: unset;
    line-clamp: unset;
    margin-bottom: 5px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .weui-media-box {
    padding: 6px 15px;
  }
  .weui-panel:first-child {
    margin-top: 0;
  }
  .title-status {
    margin-top: 10px;
    margin-left: 15px;
    display: flex;
    .weui-icon_msg {
      font-size: 60px;
      margin-right: 10px;
    }
    .text {
      flex-grow: 1;
      font-size: 24px;
      align-self: center;
    }
  }
  .detail-btns {
    .weui-panel {
      display: flex;
      button {
        flex: 1;
        line-height: 3em;
      }
    }
  }
</style>
