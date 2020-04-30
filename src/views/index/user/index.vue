<template>
  <div class="user">
    <div class="block">
      <el-carousel trigger="click" height="830px">
        <el-carousel-item v-for="item in imgs" :key="item">
          <img :src="item" alt="" />
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script>
export default {
  name: "user",

  props: {},
  //数据
  data() {
    return {
      imgs: {
        one: "http://pic1.win4000.com/wallpaper/2020-04-29/5ea94975b6919.jpg",
        two: "http://pic1.win4000.com/wallpaper/2020-04-29/5ea94977ee44a.jpg",
        three: "http://pic1.win4000.com/wallpaper/2020-04-29/5ea9497adcdfc.jpg",
        four: "http://pic1.win4000.com/wallpaper/2020-04-29/5ea9497be26aa.jpg",
        five: "http://pic1.win4000.com/wallpaper/2020-04-29/5ea92c6d8415a.jpg",
      },
    };
  },
  //方法
  methods: {},
  //计算属性
  computed: {},
  //过滤器
  filters: {},
  //进入页面就执行的生命周期,不能访问dom,可以访问data与methods
  created() {},
  //渲染页面后执行的生命周期,可以访问dom
  mounted() {},
  //侦听器
  watch: {},
  //子页面
  components: {},
};
</script>

<style lang="less">
.user {
  img {
    width: 100%;
  }
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
  }
  .el-carousel__arrow {
    // background-color: #fff;
    width: 60px;
    height: 60px;
    i.el-icon-arrow-left {
      font-size: 40px;
    }
    i.el-icon-arrow-right {
      font-size: 40px;
    }
  }
}
</style>
