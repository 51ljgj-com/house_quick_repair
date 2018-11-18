<template lang="pug">
  .user-orders-wrap.bd-wrap
    h2 我的订单
    .weui-form-preview(v-for="item in list" @click.stop="goDetail($event, item)")
      .weui-form-preview__hd
        label.weui-form-preview__label 付款金额
        em.weui-form-preview__value {{item.orderStatus > 1 ? `¥${item.orderAmount}`: '审核中...'}}
      .weui-form-preview__bd
        .weui-form-preview__item
          label.weui-form-preview__label 订单编号
          span.weui-form-preview__value WXX2018050813523254
        .weui-form-preview__item
          label.weui-form-preview__label 下单时间
          span.weui-form-preview__value {{item.orderTime}}
        .order-content
          .order-desc
            .weui-form-preview__item
              label.weui-form-preview__label 项目
              span.weui-form-preview__value {{item.orderContent}}
            .weui-form-preview__item
              label.weui-form-preview__label 状态
              span.weui-form-preview__value(:style="item.orderStatus == 1 ? 'color: red': 'color: green'") {{statusText[item.orderStatus]}}
            .weui-form-preview__item
              label.weui-form-preview__label 对接师傅
              span.weui-form-preview__value {{item.craftsman || ''}}
          .order-avatar
            img(:src="item.orderThumbUrl || '/static/img/default.png'")
      .weui-form-preview__ft(v-if="item.orderStatus == 1 || item.orderStatus == 5")
          button.weui-form-preview__btn.weui-form-preview__btn_default 客服
      .weui-form-preview__ft(v-else-if="item.orderStatus == 2 || item.orderStatus == 3")
          button.weui-form-preview__btn.weui-form-preview__btn_default 客服
          button.weui-form-preview__btn.weui-form-preview__btn_primary(type="submit") 支付
      .weui-form-preview__ft(v-else)
          button.weui-form-preview__btn.weui-form-preview__btn_default 客服
          button.weui-form-preview__btn.weui-form-preview__btn_default 评价
   
</template>
<script>
import {statusText} from '@/router/config.js';
export default {
  data: () => ({
    list: [],
    statusText
  }),
  methods: {
    goDetail(e, item) {
      if (!$(e.target).hasClass('weui-form-preview__btn')) {
        this.$router.push({path: `/user/order/${item.orderid}`});
      }
    }
  },
  mounted() {
    this.$http.get('/api/order/getMyOrders?token=' + Vue.userInfo.token).then(res => {
      if (!res.body) {
        return ;
      }
      this.list = res.body;
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
  .order-content {
    display: flex;
    .order-avatar {
      width: 5.5em;
      height: 5.5em;
      margin-left: 1em;
      background: #f2f2f2;
      img {
        max-width: 100%;
        max-height: 100%;
        display: block;
        margin: auto;
      }
    }
    .order-desc {
      flex-grow: 1;
    }
  }
</style>
