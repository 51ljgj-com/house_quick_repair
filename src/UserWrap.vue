<template lang="pug">
  #app
    #hd(v-if="!$route.meta.hideNav")
      img.logo(src="/static/img/logo_500.png")
      img.menu-icon(src="/static/img/wrap/icon_nav_form.png" @click="showMenu = !showMenu")
    #hd(v-if="$route.meta.hideNav" :class="{'second-hd': $route.meta.hideNav}")
      a.back(href="javascript:history.go(-1)")
      | {{$route.meta.title}}
    .weui-cells(:class="{'show-menu': showMenu}")
      a.weui-cell.weui-cell_access(v-for="i in links" :k="i.txt")
        .weui-cell__bd
          a(:href="i.href") {{i.txt}}
        .weui-cell__ft 
    router-view#bd
    .weui-tab
      .weui-tabbar
        router-link.weui-tabbar__item(to="/index"  tag="a")
          p.weui-tabbar__label 网站首页
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
    links: [
      {
        'txt': '网站首页',
        'href': '/index'
      }, {
        'txt': '公司简介',
        'href': '/about'
      }, {
        'txt': '联系我们',
        'href': '/about'
      }, {
        'txt': '师傅风采',
        'href': '/about'
      }, {
        'txt': '施工案例',
        'href': '/about'
      }, {
        'txt': '加入我们',
        'href': '/about'
      }, {
        'txt': '收费查询',
        'href': '/about'
      }
    ]
  }),

  watch: {
    "$route": function () {
      this.showMenu = false
    }
  }
}
</script>

<style lang="scss" scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
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

  &.show-menu {
    transform: translate(100%, 0);
  }
}
</style>
