<template lang="pug">
div(v-show="isShow")
  .weui-mask.weui-mask--visible
  .weui-dialog.weui-dialog--visible
    .weui-dialog__hd
      strong.weui-dialog__title 我要评价
    .weui-dialog__bd
      .cell
        label.text 服务评价：
        .stars
          label(v-for="i in stars")
            input(type="checkbox" :value="i" :data-service-index="i" @change="selectStar(i, 'service')")
            span ★
      .cell
        label.text 施工评价：
        .stars
          label(v-for="i in stars")
            input(type="checkbox" :value="i" :data-work-index="i" @change="selectStar(i, 'work')")
            span ★
      .cell
        textarea.weui-textarea(placeholder="请对本次服务留下建议..." rows="4" v-model="reviewDes")
    .weui-dialog__ft
      .weui-dialog__btn.primary(@click.stop="submit()") 提交
      .weui-dialog__btn.default(@click.stop="close()") 取消
</template>
<script>
export default {
  props: {
    show: {
      default: false,
      type: Boolean
    },
    orderid: ''
  },
  data: () => ({
    isShow: false,
    serviceScore: 0,
    workScore: 0,
    stars: [1, 2, 3, 4, 5],
    reviewDes: ''
  }),
  watch: {
    show(v) {
      this.isShow = v;
    }
  },
  methods: {
    close() {
      this.isShow = false;
    },
    submit() {
      this.$http.post('/api/order/createOrderReview', {
        data: this.orderid,
        token: Vue.userInfo.token,
        serviceStars: this.serviceScore,
        workStars: this.workScore,
        reviewDes: this.reviewDes,
        orderid: this.orderid
      }).then(res => {
        if (res.body && res.body.message.toLowerCase() === 'ok') {
          this.close();
          $.toast("操作成功");
        } else {
          $.toast("操作失败", 'forbidden');
        }
      })
    },
    selectStar(index, type) {
      $(`[data-${type}-index]`).map((i, item) => item.checked = false);
      for (let i = 0; i < index; i++) {
        $(`[data-${type}-index="${i+1}"]`)[0].checked = true;
      }
      this[`${type}Score`] = index;
    }
  }
}
</script>
<style lang="scss" scoped>
  .cell {
    text-align: left;
    display: flex;
    margin-top: 10px;
  }
  .text {
    width: 5em;
  }
  .stars {
    flex-grow: 1;
    input {
      display: none;
    }
    span {
      color: #999;
      font-size: 14px;
    }
    input:checked + span {
      color: #ee3923;
    }
  }
  textarea {

  }
</style>
