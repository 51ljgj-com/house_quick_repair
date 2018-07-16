<template lang="pug">
  #app
    #hd
      img.logo(src="/static/img/logo_500.png")
      nav
        router-link(to="/system" tag="a") 首页
        router-link(to="/system" tag="a") 服务项目
        router-link(to="/system" tag="a") 最新资讯
        router-link(to="/system" tag="a") 优惠活动
        router-link(to="/system" tag="a") 师傅招聘
    router-view#bd
    #ft
</template>

</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#hd {
  height: 100px;
  width: 1100px;
  margin: auto;

  .logo {
    height: 90px;
    float: left;
    margin-top: 10px;
  }

  nav {
    float: right;
    margin-left: 100px;
    a {
      float: left;
      line-height: 100px;
      margin-left: 40px;
      color: #333;
      font-size: 18px;
    }
  }
}
#bd {
  width: 100%;
}
</style>
