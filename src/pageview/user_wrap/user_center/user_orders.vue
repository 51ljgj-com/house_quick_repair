<template lang="pug">
  .user-orders-wrap.bd-wrap
    h2 我的订单
    loading(v-if="!list || !list.length" :show="true" :inline="true")
    .order-list-wrapper(v-for="item in list" @click.stop="goDetail($event, item)")
      .order-item
        .title-tip
          h3 阳台贴砖
          p.status 状态：{{statusText[item.orderStatus]}}>>
        .content
          .desc
            | 订单编号: {{item.orderid}}
            br 
            | 对接师傅: {{item.craftsman || ''}}
            br
            | 联系人: {{item.contactsUserName}}
            br
            | 电话: {{item.phoneNo}}
            br
            | 下单时间: {{item.orderTime}}
        .cost(v-if="item.orderStatus !== 1") 订单支付金额：
          strong {{item.orderStatus > 1 ? `¥${item.orderAmount}`: '审核中...'}}
        .actions(v-if="item.orderStatus == 1 || item.orderStatus == 5")
          button.weui-btn.weui-btn_mini.weui-btn_default(@click.stop="callUs()") 客服
        .actions(v-else-if="item.orderStatus == 2 || item.orderStatus == 3")
          button.weui-btn.weui-btn_mini.weui-btn_default(@click.stop="callUs()") 客服
          button.weui-btn.weui-btn_mini.weui-btn_default(type="submit" v-if="item.paymentStatus == 2 || item.paymentStatus == 5" @click.stop="pay(item.orderid)") 支付
        .actions(v-else-if="item.orderStatus == 4")
          button.weui-btn.weui-btn_mini.weui-btn_default(@click.stop="callUs()") 客服
          button.weui-btn.weui-btn_mini.weui-btn_default(@click.stop="showComment(item)") 评价
          button.weui-btn.weui-btn_mini.weui-btn_default 申请售后
        .actions(v-else)
          button.weui-btn.weui-btn_mini.weui-btn_default(@click.stop="callUs()") 客服
    comment(:show="commentIsShow" :orderid="commentOrderId")
   
</template>
<script>
import {statusText, callUs} from '@/router/util.js';
import Comment from '@/component/wrap/comment.vue';
import Loading from '@/component/wrap/loading.vue';
export default {
  data: () => ({
    list: [],
    statusText,
    commentIsShow: false,
    commentOrderId: ''
  }),
  methods: {
    goDetail(e, item) {
      if (item.orderStatus === 1) {
        return;
      }
      if (!$(e.target).hasClass('weui-form-preview__btn')) {
        this.$router.push({path: `/user/order/${item.orderid}`});
      }
    },

    callUs,

    showComment(item) {
      this.commentIsShow = new Boolean(true);
      this.commentOrderId = item.orderid;
    },

    pay(orderid) {
      this.$wxp.pay(orderid)
    }
  },
  mounted() {
    this.$http.get('/api/order/getMyOrders?token=' + Vue.userInfo.token).then(res => {
      if (!res.body) {
        return ;
      }
      this.list = res.body;
    })
  },
  components: {
    comment: Comment,
    loading: Loading
  }
}
</script>

<style lang="scss" scoped>
  h2 {
    font-size: 16px;
    padding: 10px 15px;
  }
  .order-list-wrapper {
    padding: 10px;
    .title-tip {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      padding: 10px 0;
      border-bottom: 1px solid #e2e2e2;
      h3 {
        color: #000;
        font-size: 16px;
        font-weight: normal;
      }
      .status {
        color: #ee3923;
      }
    }
    .content {
      display: flex;
      flex-direction: row;
      padding: 10px 0;
      .pic {
        width: 66px;
        height: 66px;
        margin-right: 10px;
        img {
          max-width: 100%;
          max-height: 100%;
          display: block;
          margin: auto;
        }
      }
      .desc {
        font-size: 14px;
        color: #444;
      }
    }
    .cost {
      width: 100%;
      text-align: right;
      color: #333;
      font-size: 14px;
      strong {
        font-weight: bold;
        font-size: 16px;
      }
    }
    .order-item {
      background: #fff;
      border: 1px solid #e2e2e2;
      padding: 10px;
      border-radius: 5px;
    }
    .actions {
      text-align: right;
      button {
        margin-left: 10px;
      }
    }
  }
</style>
