<template lang="pug">
transition(name="fade" mode="out-in")
  #app
    #hd(v-if="!$route.meta.hideNav")
      img.logo(src="/static/img/icon_100.png")
      img.menu-icon(src="/static/img/wrap/icon_nav_form.png" @click="showMenu = !showMenu" :style="'opacity:' + (showMenu ? 0.4: 1)")
    #hd(v-if="$route.meta.hideNav" :class="{'second-hd': $route.meta.hideNav}")
      a.back(href="javascript:history.go(-1)")
      | {{subTitle || $route.meta.title}}
    .weui-cells(:class="{'show-menu': showMenu}")
      a.weui-cell.weui-cell_access(v-for="i in links" :k="i.txt" :href="i.href")
        .weui-cell__bd
          span {{i.txt}}
        .weui-cell__ft
      a.weui-cell.weui-cell_access
    router-view#bd
    .ft-nav
      .weui-tab
        .weui-tabbar
          router-link.weui-tabbar__item(to="/index"  tag="a")
            p.weui-tabbar__label 网站首页
          router-link.weui-tabbar__item(to="/group_buy"  tag="a")
            p.weui-tabbar__label 团购入口
          router-link.weui-tabbar__item(to="/quick_order"  tag="a")
            p.weui-tabbar__label 直接预约
          router-link.weui-tabbar__item(to="/user"  tag="a")
            p.weui-tabbar__label 个人中心
</template>

<script>
export default {
  name: 'App',
  data: () => ({
    showMenu: false,
    subTitle: '',
    links: [
      {
        'txt': '网站首页',
        'href': '/wrap.html'
      }, {
        'txt': '公司简介',
        'href': '#/about'
      }, {
        'txt': '联系我们',
        'href': '#/contact'
      }, {
        'txt': '加入我们',
        'href': '#/about'
      }
    ]
  }),

  watch: {
    "$route": function () {
      this.showMenu = false
      this.subTitle = ''
    }
  },

  mounted() {
    this.$BUS.$on('subtitle-change', (title) => {
      this.subTitle = title
    })
  }
}
</script>

<style lang="scss" scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #333;
}
#hd {
  background: url("/static/img/wrap/title.png") center no-repeat #ee3923;
  background-size: auto 50%;
  width: 100%;
  height: 60px;
  padding: 10px;
  position: relative;
  color: #fff;
  line-height: 40px;
  font-size: 18px;

  .logo {
    height: 50px;
    float: left;
  }

  .menu-icon {
    width: 40px;
    float: right;
  }

  .back {
    position: absolute;
    left: 20px;
    top: 50%;
    transform: translate(0, -50%);
    &:before {
      content: ' ';
      display: block;
      width: 20px;
      height: 20px;
      border: solid #fff;
      border-width: 1px 1px 0 0;
      transform: rotate(-135deg);
    }
  }

  &.second-hd {
    background-image: none;
  }
}
#bd {
  width: 100%;
  height: calc(100vh - 100px);
  overflow: auto;
  overflow-scrolling: touch;
  -webkit-overflow-scrolling: touch;
  padding-bottom: 20px;
  background: #f2f2f2;
  position: relative;
}

.weui-tabbar__item {
  height: 40px;
  padding-top: 0;

  p {
    line-height: 40px;
  }
}

.weui-cells {
  text-align: left;
  position: absolute;
  left: -100%;
  top: 60px;
  width: 100%;
  transition: .2s all ease;
  margin-top: 0;
  z-index: 999;
  bottom: 0;
  background: rgba(255, 255, 255, .8);

  &.show-menu {
    transform: translate(100%, 0);
  }
}
.ft-nav {
  position: relative;
  width: 100%;
  height: 40px;
}
</style>
