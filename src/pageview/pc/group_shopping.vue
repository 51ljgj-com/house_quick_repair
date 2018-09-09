<template lang="pug">
.group-shopping-wrapper
  .carousel
  el-container.group-shopping  
    el-aside.top-services(width="300px")
      h1 热门服务
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
    el-main.main-wrapper
      .title
        h2 参团小区
        el-input.search(placeholder="请输入内容" v-model="input5" class="input-with-select")
          el-button(slot="append" icon="el-icon-search")
      ul.grouping-list
        li
          el-row(:gutter="0")
            el-col.col_1(style="width: 180px;")
              img.item-img(src="/static/img/service_1.jpg")
            el-col.col_2(style="width: 120px;float:right;")
              label 10户
              el-button(type="danger") 我要拼团
            el-col.col_3(style="overflow:hidden;width: auto;float: none;") 
              p 楼盘小区：万科金润华府
              p 楼盘地址：锦江区菱窠路128号
              p 拼团项目：
                span.items
                  span.item 封阳台/防盗窗
                  span.item 封阳台/防盗窗
                  span.item 封阳台/防盗窗
                  span.item 封阳台/防盗窗
                  span.item 封阳台/防盗窗
        li
          el-row(:gutter="0")
            el-col.col_1(style="width: 180px;")
              img.item-img(src="/static/img/service_1.jpg")
            el-col.col_2(style="width: 120px;float:right;")
              label 10户
              el-button(type="danger") 我要拼团
            el-col.col_3(style="overflow:hidden;width: auto;float: none;") 
              p 楼盘小区：万科金润华府
              p 楼盘地址：锦江区菱窠路128号
              p 拼团项目：
                span.items
                  span.item 封阳台/防盗窗
                  span.item 封阳台/防盗窗
                  span.item 封阳台/防盗窗
                  span.item 封阳台/防盗窗
                  span.item 封阳台/防盗窗
        li
          el-row(:gutter="0")
            el-col.col_1(style="width: 180px;")
              img.item-img(src="/static/img/service_1.jpg")
            el-col.col_2(style="width: 120px;float:right;")
              label 10户
              el-button(type="danger") 我要拼团
            el-col.col_3(style="overflow:hidden;width: auto;float: none;") 
              p 楼盘小区：万科金润华府
              p 楼盘地址：锦江区菱窠路128号
              p 拼团项目：
                span.items
                  span.item 封阳台/防盗窗
                  span.item 封阳台/防盗窗
                  span.item 封阳台/防盗窗
                  span.item 封阳台/防盗窗
                  span.item 封阳台/防盗窗
        li
          el-row(:gutter="0")
            el-col.col_1(style="width: 180px;")
              img.item-img(src="/static/img/service_1.jpg")
            el-col.col_2(style="width: 120px;float:right;")
              label 10户
              el-button(type="danger") 我要拼团
            el-col.col_3(style="overflow:hidden;width: auto;float: none;") 
              p 楼盘小区：万科金润华府
              p 楼盘地址：锦江区菱窠路128号
              p 拼团项目：
                span.items
                  span.item 封阳台/防盗窗
                  span.item 封阳台/防盗窗
                  span.item 封阳台/防盗窗
                  span.item 封阳台/防盗窗
                  span.item 封阳台/防盗窗
      el-pagination.pager(
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage3"
        :page-size="100"
        layout="prev, pager, next, jumper"
        :total="1000")
</template>

</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
.group-shopping {
  width: 1200px;
}
.top-services {
  li {
    img {
      width: 160px;
    }
  }
}
.grouping-list {
  li {
    padding: 20px 0 15px 0;
    border-bottom: 1px solid #f2f2f2;
  }
  .item-img {
    max-width: 100%;
    max-height: 100%;
  }
  .col_2 {
  }
  .col_3 {
    text-align: left;
    padding: 0 30px;
  }
}

.main-wrapper {
  .title {
    overflow: hidden;
    h2 {
      float: left;
    }
    .search {
      width: 560px;
      float: right;
    }

  }
  .pager {
    margin-top: 20px;
  }
}
</style>
