<template lang="pug">
  .hot-services
    h2 热门服务
    ul
      li
        img(src="/static/img/service/厨卫改造.png")
        h3 水电改造/安装
      li
        img(src="/static/img/service/厨卫改造.png")
        h3 水电改造/安装
      li
        img(src="/static/img/service/厨卫改造.png")
        h3 水电改造/安装
      li
        img(src="/static/img/service/厨卫改造.png")
        h3 水电改造/安装
</template>
<script>
export default {

}
</script>

<style lang="scss">
.hot-services {
  text-align:center;
  h2 {
    margin-bottom: 27px;
  }
  li {
    padding: 20px 0;
    border: 1px solid #f2f2f2;
    margin-top: -1px;
  }
}
.hot-services {
  li {
    img {
      width: 160px;
    }
  }
}
</style>
