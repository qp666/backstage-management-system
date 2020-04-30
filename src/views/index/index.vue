<template>
  <div class="index">
    <el-container>
      <el-header>
        <div class="leftBox">
          <!-- <i
            v-if="isCollapse"
            @click="isCollapse = !isCollapse"
            class="el-icon-s-unfold"
          ></i>
          <i
            v-else
            @click="isCollapse = !isCollapse"
            class="el-icon-s-fold"
          ></i> -->
          <i
            class="icon my_icon"
            @click="isCollapse = !isCollapse"
            :class="isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'"
          ></i>
          <img src="@/assets/mm.png" alt="" />
          <span>无事制作</span>
        </div>
        <div class="rightBox">
          <img :src="$store.state.userImg" alt="" />
          <span class="text">{{ $store.state.userName }},你好</span>
          <el-button type="primary" plain @click="goOut" size="small"
            >退出</el-button
          >
        </div>
      </el-header>
      <el-container>
        <el-aside width="auto">
          <el-menu
            router
            :collapse="isCollapse"
            default-active="/index/subject"
            class="el-menu-vertical-demo"
          >
            <el-menu-item index="/index/chart">
              <i class="el-icon-picture-outline-round"></i>
              <span slot="title">数据概览</span>
            </el-menu-item>
            <el-menu-item index="/index/user">
              <i class="el-icon-user"></i>
              <span slot="title">用户列表</span>
            </el-menu-item>
            <el-menu-item index="/index/question">
              <i class="el-icon-edit-outline"></i>
              <span slot="title">题库列表</span>
            </el-menu-item>
            <el-menu-item index="/index/enterprise">
              <i class="el-icon-map-location"></i>
              <span slot="title">深圳地图</span>
            </el-menu-item>
            <el-menu-item index="/index/subject">
              <i class="el-icon-reading"></i>
              <span slot="title">学科列表</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
    <el-dialog :visible.sync="dialogVisible" width="30%">
      <span class="goOut">确定退出登录吗?</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="YES">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { removeToken } from "@/utils/token.js";
import api from "@/utils/request.js";
export default {
  name: "index",

  props: {},
  //数据
  data() {
    return {
      dialogVisible: false,
      isTrue: true,
      isCollapse: false,
    };
  },
  //方法
  methods: {
    // handleClose(done) {
    //   this.dialogVisible = true;
    //   // this.$confirm("确认关闭？")
    //   //   .then((_) => {
    //   //     done();
    //   //   })
    //   //   .catch((_) => {});
    // },
    YES() {
      this.dialogVisible = true;
      removeToken();
      this.$router.push("/");
    },
    //退出登录
    goOut() {
      this.dialogVisible = true;
      // removeToken();
      // this.$router.push("/");
    },
  },
  //计算属性
  computed: {},
  //过滤器
  filters: {},
  //进入页面就执行的生命周期,不能访问dom,可以访问data与methods
  created() {
    // api.getUser().then((res) => {
    //   if (res.data.code == 200) {
    //     if (res.data.data.status) {
    //       this.$store.commit("changeName", res.data.data.username);
    //       this.$store.commit(
    //         "changeImg",
    //         "http://127.0.0.1/heimamm/public" + "/" + res.data.data.avatar
    //       );
    //       this.$store.commit("changeRole", res.data.data.role);
    //     }
    //   } else {
    //     this.$message({
    //       type: "error",
    //       message: "请重新登录!",
    //     });
    //     removeToken();
    //     this.$router.push("/");
    //   }
    // });
  },
  //渲染页面后执行的生命周期,可以访问dom
  mounted() {},
  //侦听器
  watch: {},
  //子页面
  components: {},
};
</script>

<style lang="less">
.index {
  width: 100%;
  height: 100%;
  .el-dialog__body {
    text-align: center;
    span.goOut {
      font-size: 35px;
      font-weight: 700;
    }
  }
  section.el-container.is-vertical {
    height: 100%;
  }
  .el-header {
    background-color: #dfe4ea;
    display: flex;
    justify-content: space-between;
    .leftBox {
      display: flex;
      align-items: center;
      i {
        font-size: 35px;
      }
      img {
        width: 33px;
        height: 33px;
        margin-left: 20px;
        margin-right: 20px;
      }
      span {
        font-size: 33px;
        color: #1e90ff;
      }
    }

    .rightBox {
      display: flex;
      align-items: center;
      img {
        width: 43px;
        height: 43px;
        border-radius: 50%;
        margin-right: 20px;
      }
      .text {
        margin-right: 40px;
      }
    }
  }

  .el-aside {
    height: 100%;
    background-color: #d2dae2;
    .el-menu-vertical-demo:not(.el-menu--collapse) {
      width: 200px;
      min-height: 100%;
    }
    .el-menu--collapse {
      min-height: 100%;
    }
    // li.el-menu-item.is-active {
    //   span {
    //     margin-right: 100px;
    //   }
    // }
  }
  .el-main {
    background-color: #ef5777;
  }
}
</style>
