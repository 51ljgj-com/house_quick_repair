<template lang="pug">
  .group-buy-detail-wrapper
    .head
      .img
        img(:src="groupInfo.houseThumbUrl")
      .title
        h2 {{groupInfo.houseName}}
        p {{groupInfo.userJoinCount}}人拼团
    p.addr {{groupInfo.houseAddress}}
    .weui-panel.weui-panel_access
      .weui-panel__hd 请按步骤填写订单
      .weui-panel__bd
        .weui-media-box.weui-media-box_text
          h4.weui-media-box__title 1、选择拼团项目
          ul.weui-media-box__desc.group-item#groupItemSelect
            li(v-for="item in groupInfo.groupServiceList" :class="{active:item.gServiceItemid === form.gServiceItemid}" @click="checkItem(item.gServiceItemid)") {{item.gServiceItemName}}
        .weui-media-box.weui-media-box_text
          h4.weui-media-box__title 2、了解团购流程
          p.weui-media-box__desc.group-steps
            img(src="/static/img/group_steps.png")
        .weui-media-box.weui-media-box_text
          h4.weui-media-box__title 3、阅读团购详情
          ul.weui-media-box__desc.group-info
            li(v-for="item in groupRules") {{item.groupRuleContent}}
        .weui-media-box.weui-media-box_text
          h4.weui-media-box__title 4、填写团购信息
          vue-form.weui-media-box__desc.weui-cells.weui-cells_form(:state="formstate")
            validate.weui-cell(:class="{'weui-cell_warn': formstate.name && formstate.name.$invalid}")
              .weui-cell__hd
                label.weui-label 姓名
              .weui-cell__bd
                input(class="weui-input" type="text" v-model="form.contactsUserName" placeholder="请输入姓名" name="name" required)
              weui-cell__ft
                i.weui-icon-warn
            validate.weui-cell(:class="{'weui-cell_warn': formstate.phone && formstate.phone.$invalid}")
              .weui-cell__hd
                label.weui-label 手机号
              .weui-cell__bd
                input(class="weui-input" type="tel" v-model="form.phoneNo" placeholder="请输入11位手机号" name="phone" pattern="\\d{11}" required)
              weui-cell__ft
                i.weui-icon-warn
            //- validate.weui-cell(:class="{'weui-cell_warn': !form.orderAddress1}")
            //-   .weui-cell__hd
            //-     label.weui-label 选择区县
            //-   .weui-cell__bd
            //-     input#addr(class="weui-input" @click="showAddr()" type="text" placeholder="请选择区县" name="addr")
            //-   weui-cell__ft
            //-     i.weui-icon-warn
            validate.weui-cell(:class="{'weui-cell_warn': formstate.infoAddr && formstate.infoAddr.$invalid}")
              .weui-cell__hd
                label.weui-label 详细地址
              .weui-cell__bd
                input(class="weui-input" type="text" v-model="form.orderAddress2" placeholder="请输入您的详细地址" name="infoAddr" required)
              weui-cell__ft
                i.weui-icon-warn
            //- validate.weui-cell(:class="{'weui-cell_warn': formstate.date && formstate.date.$invalid}")
            //-   .weui-cell__hd
            //-     label.weui-label 测量时间
            //-   .weui-cell__bd
            //-     input(class="weui-input" type="date" v-model="form.houseAddress" placeholder="请输入上门测量时间(非必填)" name="date")
            //-   weui-cell__ft
            //-     i.weui-icon-warn
            validate.weui-cell(:class="{'weui-cell_warn': formstate.other && formstate.other.$invalid}")
              .weui-cell__hd
                label.weui-label 其他要求
              .weui-cell__bd
                textarea(class="weui-textarea" v-model="form.groupContent" placeholder="其他要求说明(非必填)" name="other" row="5")
              weui-cell__ft
                i.weui-icon-warn
      .weui-panel__ft.order-action
        a.weui-btn.weui-btn_default 电话咨询
        a.weui-btn.weui-btn_primary(@click.stop="submit()") 立即参团
  </div>
</template>
<script>
import Loading from '../../component/wrap/loading.vue';
let xhr = null;
let inputTimer = null;
export default {
  data: () => ({
    formstate: {},
    form: {
      contactsUserName: '',
      phoneNo: '',
      gServiceItemid: '',
      orderAddress: '',
      houseName: '',
      groupContent: '',
      orderAddress2: '',
      // orderAddress1: ''
    },
    groupInfo: {},
    groupRules: null
  }),
  methods: {
    fetchItems() {
      this.$http.post('/api/group/getGroupItem', {
        groupid: this.$route.params.groupid
      }).then(res => {
        let body = res.body
        if (body && body.error) {
          return
        }
        this.groupInfo = body.data[0];
        if(this.groupInfo.houseThumbUrl) {
          this.groupInfo.houseThumbUrl = this.SERVER_HOST + this.groupInfo.houseThumbUrl.trim()
        } else {
          this.groupInfo.houseThumbUrl = '/static/img/icon_100.png'
        }
      })
    },
    fetchGroupRules() {
      this.$http.get('/api/group/getGroupRules').then(res => {
        let body = res.body
        if (body && body.error) {
          return
        }
        this.groupRules = body.data;
      })
    },
    checkItem(id) {
      this.form.gServiceItemid = id;
    },
    submit() {
      if(!this.form.gServiceItemid) {
        $('#bd').scrollTop(0);
        $.toast("请选择拼团项目", "forbidden");
        return false;
      };
      if(this.formstate.$invalid) return;
      // this.form.orderAddress = this.form.orderAddress1 + this.form.orderAddress2;
      this.form.orderAddress = this.form.orderAddress2;
      let params = Object.assign({}, this.form, {
        token: Vue.userInfo.token, 
        orderContent: this.$route.query.orderContent,
        isGroupOrder: true
      })
      this.$http.post('/api/order/createOrder', params).then(res => {
        res = res.body;
        if (res.code) return;
        // this.$router.push({path: '/order_pay'})
        this.$showOptRet();
      })
    }
  },
  computed: {
  },
  mounted() {
    this.fetchItems();
    this.fetchGroupRules();
  },
  watch: {
  },
  components: {
    'loading': Loading,
  }
}
</script>

<style lang="scss" scoped>
  .group-buy-detail-wrapper {
    text-align: left;

    .head {
      display: flex;
      padding: 10px 10px 5px 10px;
      background: #fff;
      .title {
        flex-grow: 1;
        margin-left: 10px;
        p {
          color: #ee3923;
        }
      }
      .img {
        width: 60px;
        height: 60px;
        background: #f2f2f2;
        display: flex;
        img {
          max-width: 100%;
          max-height: 100%;
          align-self: center;
        }
      }
    }
    .addr {
      background: #fff;
      padding: 0 10px 10px 10px;
      color: #666;
      font-size: 14px;
    }
    .group-item {
      margin-top: -10px;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      li {
        padding: 5px 10px;
        margin-top: 10px;
        width: 31%;
        border: 1px solid #ccc;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        &.active {
          border-color: #ee3923;
          position: relative;
          &:after {
            content: '◢';
            color: #ee3923;
            position: absolute;
            right: 0;
            bottom: 0;
            font-size: 14px;
            height: 14px;
          }
          &:before {
            content: '√';
            color: #ffffff;
            position: absolute;
            right: 0;
            bottom: 2px;
            font-size: 12px;
            height: 12px;
            z-index: 2;
          }
        }
      }
    }
    .group-steps {
      text-align: center;
      img {
        height: 80px;
      }
    }
    .group-info {
      li {
        display: flex;
        color: #666;
        line-height: 1.4;
        margin-top: 5px;
        &:before {
          content: '▶';
          margin-right: 5px;
          color: #aaa;
          font-size: 12px;
        }
      }
    }
    .order-action {
      text-align: center;
      padding-bottom: 10px;
      .weui-btn {
        display: inline-block;
        margin-top: 0;
        &:first-child {
          margin-right: 20px;
        }
      }
    }
  }
</style>
