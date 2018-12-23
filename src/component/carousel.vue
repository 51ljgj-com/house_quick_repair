<template lang="pug">
.carousel(:style="wrapStyle")
  .banner(v-for="item in list" :key="item" :style="{'background-image': 'url(' + item + ')'}")
</template>
<script>
export default {
  props: {
    list: {
      default: [],
      type: Array
    },
    dataW: {
      default: 1200,
      type: Number
    },
    dataH: {
      default: 450,
      type: Number
    }
  },
  computed: {
    wrapStyle() {
      return {
        width: this.dataW + 'px',
        height: this.dataH + 'px'
      }
    }
  },
  mounted() {
    $('.carousel').slick({
      dots: true,
      autoplay: true
    })
  }
}
</script>

<style lang="scss">
.carousel {
  margin: auto;
  padding: 0;
    .banner {
      background-size: 100%;
      background-position: center;
      background-repeat: no-repeat;
      height: 100%;
      width: 100%;
    }

    .slick-track {
      height: 100%;
    }
}
</style>