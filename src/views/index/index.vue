<template>
  <div>
    我是首页
  </div>
</template>

<script>
// import store from "@/store/index";
import api from "@/utils/request.js";
export default {
  name: "index",

  props: {},
  //数据
  data() {
    return {};
  },
  //方法
  methods: {},
  //计算属性
  computed: {},
  //过滤器
  filters: {},
  //进入页面就执行的生命周期,不能访问dom,可以访问data与methods
  created() {
    api.getUser().then((res) => {
      if (res.data.code == 200) {
        if (res.data.data.status) {
          this.$store.commit("changeName", res.data.data.username);
          this.$store.commit(
            "changeImg",
            "http://127.0.0.1/heimamm/public" + "/" + res.data.data.avatar
          );
          this.$store.commit("changeRole", res.data.data.role);
        }
      } else {
        this.$message({
          type: "error",
          message: "请重新登录!",
        });
      }
    });
  },
  //渲染页面后执行的生命周期,可以访问dom
  mounted() {},
  //侦听器
  watch: {},
  //子页面
  components: {},
};
</script>

<style></style>
