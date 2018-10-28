<template lang="pug">
  .group-buy-wrapper
    .search
      .weui-search-bar(:class="{'weui-search-bar_focusing': searchEnableInput}")
        form.weui-search-bar__form
          .weui-search-bar__box
            i.weui-icon-search
            input.weui-search-bar__input(type="search" placeholder="搜索" required="" @blur="toggleSearch(false)")
            a.weui-icon-clear(href="javascript:")
          label.weui-search-bar__label(@click="toggleSearch(true)")
            i.weui-icon-search
            span 搜索
        a.weui-search-bar__cancel-btn(@click.stop="toggleSearch(false)") 取消
      .tips
        h1 参团小区
        p 没有您的小区？
          a(href="") 立即创建
    .content
      loading(:show="!goodsList")
      .weui-panel.weui-panel_access
        .weui-panel__hd 当前共{{goodsList ? goodsList.length: 0}}条团购结果
        .weui-panel__bd(v-for="item in goodsList")
          a.weui-media-box.weui-media-box_appmsg
            .weui-media-box__hd
              img.weui-media-box__thumb(:src="item.houseThumbUrl")
            .weui-media-box__bd
              h4.weui-media-box__title {{item.houseName}}
                p.join-num 已拼{{item.userJoinCount}}户
              p.weui-media-box__desc 楼盘地址: {{item.houseAddress}}
              p.weui-media-box__desc 拼团项目: {{item.groupServiceList.map(i => i.gServiceItemName).join('•')}}
        .weui-panel__ft
          a.weui-cell.weui-cell_access.weui-cell_link
            .weui-cell__bd 查看更多
            span.weui-cell__ft
</template>
<script>
import Loading from '../../component/wrap/loading.vue';
export default {
  data: () => ({
    goodsList: null,
    searchEnableInput: false,
  }),
  methods: {
    fetchAllGoods() {
      this.$http.get('/api/group/getAllGroups').then(res => {
        let body = res.body
        // if (body && body.code) {
        //   return
        // }
        body.map(i => {
          i.houseThumbUrl = i.houseThumbUrl.trim().replace('..', this.SERVER_HOST);
          return i;
        })
        this.goodsList = body;
      })
    },
    toggleSearch(type) {
      this.searchEnableInput = type;
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
      }
      .tips {
        display: flex;
        justify-content: space-between;
        height: 36px;
        line-height: 36px;
        padding: 0 10px;
        background: #ffffff;
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
        color: #ee3923;
        float: right
      }
    }
  }
</style>
