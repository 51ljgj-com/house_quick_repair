<template lang="pug">
.service-content-container
  p.top-hd 施工案例
  ul
    li
      img(src="/static/img/case_1.jpg")
      .desc
          span 小区: 保利天语
          span 服务项目: 墙面翻新
          span 服务时间: 2018-6-15
    li
      img(src="/static/img/case_2.jpg")
      .desc
          span 小区: 保利天语
          span 服务项目: 墙面翻新
          span 服务时间: 2018-6-15
</template>
<script>
export default {

}
</script>

<style lang="scss">
.service-content-container {
  border: 1px solid #ccc;
  width: 1200px;
  margin: 20px auto;

  .top-hd {
    font-size: 22px;
    line-height: 50px;
    background: #f3f3f3;
    border-bottom: 1px solid #ccc;
    margin: auto;
  }

  ul {
    overflow: hidden;
  }
  li {
    width: 230px;
    height: 270px;
    overflow: hidden;
    position: relative;
    float: left;
    margin-right: 10px;
    img {
      min-width: 100%;
      min-height: 100%;
      position: relative;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
    .desc {
      height: 70px;
      background: rgba(0, 0, 0, .4);
      padding: 10px;
      color: #fff;
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      span {
        display: block;
        text-align: left;
        font-size: 14px;
        line-height: 1.4;
      }
    }
  }
}
</style>