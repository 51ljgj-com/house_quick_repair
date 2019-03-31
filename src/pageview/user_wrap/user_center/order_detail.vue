<template lang="pug">
.user-orders-detail-wrap
  loading(:show="Boolean(!info || $wxp.isLoadingWxOpenId)" :inline="true")
  div(v-if="info")
    .title-status(:data-status="info.orderBaseInfo.orderStatus >= 4 ? 'done': 'doing'")
      i.weui-icon_msg(:class="info.orderBaseInfo.orderStatus >= 4 ? 'weui-icon-success': 'weui-icon-waiting'")
      p.text {{statusText[info.orderBaseInfo.orderStatus]}}
      .user-desc(style="align-self: flex-end;margin-right: 10px;") {{info.orderBaseInfo.contactsUserName + ': ' + info.orderBaseInfo.phoneNo}}
    .weui-panel.weui-panel_access
      .weui-panel__hd 订单基本信息
      .weui-panel__bd
        .weui-media-box
          label.weui-form-preview__label 订单编号:
          span.weui-form-preview__value {{info.orderid}}
        .weui-media-box
          label.weui-form-preview__label 订单类别:
          span.weui-form-preview__value {{info.orderBaseInfo.orderContent}}
        .weui-media-box
          label.weui-form-preview__label 下单时间:
          span.weui-form-preview__value {{info.orderBaseInfo.orderTime}}
        .weui-media-box
          label.weui-form-preview__label 订单地址:
          span.weui-form-preview__value {{info.orderBaseInfo.orderAddress}}
      .weui-panel__ft

    .weui-panel.weui-panel_access(v-if="info.groupOrderInfo")
      .weui-panel__hd 参团信息
      .weui-panel__bd
        .weui-media-box
          label.weui-form-preview__label 参团项目:
          span.weui-form-preview__value {{info.groupOrderInfo.groupService}}
        .weui-media-box
          label.weui-form-preview__label 团购小区:
          span.weui-form-preview__value {{info.groupOrderInfo.houseName}}

    .weui-panel.weui-panel_access(v-if="info.fundItems&&info.fundItems.length")
      .weui-panel__hd 预付款项
      .order-prefund-wrapper
        table.prefund-table
          tr(v-for="fitem in info.fundItems")
            td
              label.weui-form-preview__label(v-if="fitem.fundItemType == 1") 预付款
              label.weui-form-preview__label(v-if="fitem.fundItemType != 1") 其他
              label.weui-form-preview__label.red(v-if="fitem.fundItemStatus == 2") (未支付)
            td
              span.weui-form-preview__value ￥{{(+fitem.fundItemAmount / 100).toFixed(2)}}
            td
              span.weui-icon-success(v-if="fitem.fundItemStatus == 3")
              button.weui-form-preview__btn.weui-form-preview__btn_primary(v-if="fitem.fundItemStatus == 2", @click.stop="prefundPay(fitem)") 支付
    
    .weui-panel.weui-panel_access(v-if="info.orderBaseInfo.orderStatus != 1")
      .weui-panel__hd 订单金额
      .weui-panel__bd
        .weui-media-box
          label.weui-form-preview__label 订单总额:
          span.weui-form-preview__value {{(+info.orderAmountInfo.orderAmount / 100).toFixed(2)}}
        .weui-media-box(v-for="coupon in info.orderAmountInfo.orderDiscountList")
          label.weui-form-preview__label {{coupon.discountTitle}}
          span.weui-form-preview__value {{(+coupon.discountAmount / 100).toFixed(2)}}
      .weui-panel__ft
        .weui-cell__bd(v-if="info.orderAmountInfo.paymentStatus == 2")
          .weui-cell(style="color: red;text-align: right") 待付款: ¥{{(+info.orderAmountInfo.surplusAmount / 100).toFixed(2)}}
        .weui-cell__bd(v-else)
          .weui-cell(style="color: green;text-align: right") 实付款: ¥{{(+info.orderAmountInfo.paidAmount / 100).toFixed(2)}}
    
    .weui-panel.weui-panel_access(v-if="info.orderBaseInfo.orderStatus != 1")
      .weui-panel__hd 订单施工内容
      .weui-panel__bd
        .weui-media-box
          p.weui-media-box__desc(v-for="work in info.orderWorkList" v-html="work.orderWork")
      .weui-panel__ft

    .detail-btns
      .weui-panel.weui-panel_access(v-if="info.orderBaseInfo.orderStatus == 1 || info.orderBaseInfo.orderStatus == 5")
          button.weui-form-preview__btn.weui-form-preview__btn_default(@click.stop="callUs()") 客服
          a.weui-form-preview__btn.weui-form-preview__btn_default(:href="'#/contract/'+info.orderid") 合同
      .weui-panel.weui-panel_access(v-else-if="info.orderBaseInfo.orderStatus == 2 || info.orderBaseInfo.orderStatus == 3")
          button.weui-form-preview__btn.weui-form-preview__btn_default(@click.stop="callUs()") 客服
          a.weui-form-preview__btn.weui-form-preview__btn_default(:href="'#/contract/'+info.orderid") 合同
          button.weui-form-preview__btn.weui-form-preview__btn_primary(:disabled="info.orderAmountInfo.paymentStatus != 2", type="submit", @click.stop="pay(info.orderid)") 支付
      .weui-panel.weui-panel_access(v-else)
          button.weui-form-preview__btn.weui-form-preview__btn_default(@click.stop="callUs()") 客服
          a.weui-form-preview__btn.weui-form-preview__btn_default(:href="'#/contract/'+info.orderid") 合同
          button.weui-form-preview__btn.weui-form-preview__btn_default(@click.stop="showComment()") 评价
    comment(:show="commentIsShow" :orderid="commentOrderId")
</template>
<script>
import {statusText, callUs} from '@/router/util.js';
import Comment from '@/component/wrap/comment.vue';
import Loading from '@/component/wrap/loading.vue';
export default {
  data: () => ({
    info: null,
    statusText,
    commentIsShow: false,
    commentOrderId: ''
  }),
  methods: {
    callUs,
    pay(orderId) {
      this.$wxp.pay(orderId);
    },
    prefundPay(item) {
      this.$wxp.prepayFund(item.fundItemId);
    },
    showComment(item) {
      this.commentIsShow = new Boolean(true);
      this.commentOrderId = this.info.orderid;
    }
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
  },
  components: {
    comment: Comment,
    loading: Loading
  }
}
</script>

<style lang="scss" scoped>
.order-prefund-wrapper {
  padding: 5px 15px;
  table {
    width: 100%;
    tr {
      height: 40px;

      td {
        button {
          width: 35px;
        
        }
      }
    }
  }

}
  .red {
    color: red;
  }
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
      a, button {
        flex: 1;
        line-height: 3em;
      }
    }
  }
  .weui-panel__hd {
    font-size: 18px;
    color: #333;
    border-bottom: solid 1px #eee;
  }

  
</style>
