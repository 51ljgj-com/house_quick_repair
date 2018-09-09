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
      .about
        img.qr-code(src="/static/img/qr_code.jpg")
        .text
          strong 邻家工匠
          | 微信公众号<br> 
          span 扫一扫更多优惠等着您<br> 领取优惠券<br>查看价格
        .tel 
          span 服务热线<br>028-85147492
      p.copyright ©2014-2018 邻家工匠 版权所有，并保留所有权利，蜀ICP备1500982-1号
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

#ft {
  color: #fff;
  padding: 50px 0 10px 0;
  background: #191821;
  text-align: center;

  .qr-code {
    display: inline-block;
    vertical-align: middle;
    width: 200px;
    height: 200px;
  }

  .text {
    display: inline-block;
    vertical-align: middle;
    margin-left: 50px;
    padding-right: 30px;
    border-right: 1px solid rgba(255, 255, 255, .3);
    padding-top: 25px;
    height: 200px;
    font-size: 20px;
    line-height: 1.5;
    text-align: left;
    strong {
      font-size: 26px;
      margin-right: 5x;
    }
    span {
      font-size: 18px;
      margin-top: 10px;
    }
  }

  .tel {
    display: inline-block;
    vertical-align: middle;
    margin-left: 80px;
    text-align: left;
    &:before {
      content: ' ';
      width: 90px;
      height: 90px;
      background: url(/static/img/icon_tel.png) no-repeat center;
      background-size: 90% 90%;
      margin-right: 30px;
      display: inline-block;
      vertical-align: middle;
    }
    font-size: 28px;
    line-height: 45px;
    span {
      display: inline-block;
      vertical-align: middle;
    }
  }
  .copyright {
    margin-top: 20px;
    font-size: 14px;
  }
}
</style>
