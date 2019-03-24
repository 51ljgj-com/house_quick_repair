<template lang="pug">
  .group-buy-wrapper
    .search
      .weui-search-bar(:class="{'weui-search-bar_focusing': searchEnableInput}")
        form.weui-search-bar__form
          .weui-search-bar__box
            i.weui-icon-search
            input.weui-search-bar__input(type="search" v-model="keyword" placeholder="搜索小区" required="" @keyup="goSearch($event)" @blur="goSearch($event)")
            a.weui-icon-clear(href="javascript:" @click.stop="keyword=''")
          label.weui-search-bar__label(@click="toggleSearch(true)")
            i.weui-icon-search
            span 搜索
        a.weui-search-bar__cancel-btn(@click.stop="toggleSearch(false)") 取消
      .tips
        h1 参团小区
        p 没有您的小区？
          a(href="#/add_house" style="color:#ee3923;") 立即创建
    .content
      loading(:show="!allList" :inline="true")
      .weui-panel.weui-panel_access(v-show="showList&&showList.length")
        .weui-panel__hd 当前共{{showList ? showList.length: 0}}条团购结果
        .weui-panel__bd(v-for="item in showList")
          .weui-media-box.weui-media-box_appmsg
            .weui-media-box__hd
              img.weui-media-box__thumb(:src="item.houseThumbUrl")
              p.join-num {{item.userJoinCount}}户
            .weui-media-box__bd
              h4.weui-media-box__title 楼盘小区: {{item.houseName}}
              p.weui-media-box__desc 楼盘地址: {{item.houseAddress}}
              div.weui-media-box__desc
                div(style="white-space:nowrap") 拼团项目: 
                span.items
                  span.item(v-for="i in item.groupServiceList") {{i.gServiceItemName}}
              a.weui-btn.weui-btn_primary.go-buy(:href="'#/group_buy_detail/' + item.groupid") 我要拼团
        .weui-panel__ft
          //- a.weui-cell.weui-cell_access.weui-cell_link
          //-   .weui-cell__bd 查看更多
          //-   span.weui-cell__ft
      .no-data(v-show="showList&&!showList.length")
        .icon
        h3 没有找到小区,
          a(href="#/add_house") 立即创建
        p 创建小区，加入团购，享受更多优惠
</template>
<script>
import Loading from '../../component/wrap/loading.vue';
let xhr = null;
let inputTimer = null;
export default {
  data: () => ({
    allList: null,
    searchEnableInput: false,
    keyword: '',
    searchList: null
  }),
  methods: {
    fetchAllGoods() {
      this.$http.get('/api/group/getAllGroups').then(res => {
        let body = res.body
        // if (body && body.code) {
        //   return
        // }
        body.map(i => {
          if (i.houseThumbUrl) {
            i.houseThumbUrl = this.SERVER_HOST + i.houseThumbUrl.trim();
          } else {
            i.houseThumbUrl = '/static/img/icon_100.png';
          }
          return i;
        })
        this.allList = body;
      })
    },
    toggleSearch(type) {
      this.searchEnableInput = type;
    },
    goSearch(e) {
      if (inputTimer) {
        clearTimeout(inputTimer);
        inputTimer = null;
      }
      //if (e.keyCode !== 13) return;
      if (!this.keyword.trim()) return;
      inputTimer = setTimeout(() => {
        this.$http.post('/api/group/getGroupBySearch', {
          houseName: this.keyword.trim(),
          before(request) {
            if (xhr) {
              xhr.abort();
            }
            xhr = request;
          }
        }).then(res => {
          let body = res.body
          if (body && body.error) {
            return
          }
          body.data.map(i => {
            i.houseThumbUrl = this.SERVER_HOST + i.houseThumbUrl.trim();
            return i;
          })
          this.searchList = body.data;
        })
      }, 300)
    }
  },
  computed: {
    showList() {
      return this.searchEnableInput && this.searchList ? this.searchList: this.allList;
    }
  },
  mounted() {
    this.fetchAllGoods()
  },
  watch: {
    
  },
  components: {
    'loading': Loading
  }
}
</script>

<style lang="scss" scoped>
  .group-buy-wrapper {
    text-align: left;
    flex-direction: column;
    position: relative;
    .search {
      height: 80px;
      h1 {
        font-size: 18px;
        text-align: left;
        &:before {
          content: ' ';
          width: 20px;
          height: 20px;
          display: inline-block;
          vertical-align: middle;
          background: url('/static/img/icon_house.png') no-repeat center;
          background-size: contain;
          margin-top: -4px;
          margin-right: 5px;
        }
      }
      .tips {
        display: flex;
        justify-content: space-between;
        height: 36px;
        line-height: 36px;
        padding: 0 10px;
        background: #ffffff;
        border-bottom: 1px solid #e5e5e5;
        z-index: 1;
        position: relative;
        p {
          font-size: 14px;
          color: #666;
          a {
            text-decoration: underline;
          }
        }
      }
    }
    .content {
      position: absolute;
      left: 0;
      top: 80px;
      bottom: 0;
      width: 100%;
      overflow: scroll;
      .join-num {
        color: #333;
        width: 100%;
        text-align: center;
        font-size: 20px;
      }
      .no-data {
        text-align: center;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        white-space: nowrap;
        .icon {
          height: 80px;
          background: url(/static/img/no_result.png) no-repeat center;
          background-size: contain;
        }
        h3 {
          font-weight: normal;
          font-size: 18px;
          margin: 10px 0;
          a {
            text-decoration: underline;
          }
        }
        p {
          color: #ee3923;
          font-size: 14px;
        }
      }
    }
    .weui-media-box__thumb {
      background-color: #efeff4;
    }

    .weui-search-bar__box {
      border: 1px solid #c3bdbd;
      border-radius: 3px;
    }

    .weui-media-box__hd {
      height: auto;
      line-height: inherit;
      margin-bottom: 5px;
      align-self: flex-start;
    }

    .weui-media-box__title, .weui-media-box__desc {
      font-size: 14px;
      font-weight: normal;
      color: #333;
      display: flex;
    }

    .items {
      margin-top: -2px;
      line-height: 1;
      .item {
        font-size: 12px;
        width: 50%;
        display: inline-block;
        padding-right: 1em;
        &:before {
          content: '●';
          color: #ee3923;
          font-size: 16px;
        }
      }
    }
    .go-buy {
      font-size: 14px;
      line-height: 2.5;
      margin-top: 5px;
    }
  }
</style>
