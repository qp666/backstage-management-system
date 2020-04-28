<template>
  <!-- 注册框 -->
  <div class="register">
    <el-dialog
      title="用户注册"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="头像" prop="pic">
          <el-upload
            v-model="ruleForm.pic"
            name="image"
            class="avatar-uploader"
            :action="picU"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="昵称" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="图形码" prop="name">
          <el-row :gutter="20">
            <el-col :span="15">
              <el-input v-model="ruleForm.name"></el-input>
            </el-col>
            <el-col class="el_col8" :span="8">
              <img
                class="captcha"
                ref="captcha"
                src="http://127.0.0.1/heimamm/public/captcha?type=login"
                alt=""
              />
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="验证码" prop="name">
          <el-row :gutter="20">
            <el-col :span="15">
              <el-input v-model="ruleForm.name"></el-input>
            </el-col>
            <el-col class="el_col8" :span="8">
              <el-button :disabled="!isTrue" @click="userCode">{{
                isTrue ? "获取验证码" : times
              }}</el-button>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "register",

  props: {},
  //数据
  data() {
    return {
      picU: "http://127.0.0.1/heimamm/public" + "/uploads", //头像路径接口
      imageUrl: "",
      dialogVisible: true,
      timer: "",
      times: 10,
      isTrue: true,

      ruleForm: {
        name: "",
        pic: "",
      },
      rules: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
      },
    };
  },
  //方法
  methods: {
    //验证码获取
    userCode() {
      if (!this.isTrue) return;
      this.isTrue = false;
      this.timer = setInterval(() => {
        this.times--;
        if (this.times == 0) {
          this.isTrue = true;
          this.times = 10;
          clearInterval(this.timer);
        }
      }, 500);
    },

    //把上传的文件做成临时url绑定给图片的src
    handleAvatarSuccess(res, file) {
      console.log("上传图片:", res);

      this.imageUrl = URL.createObjectURL(file.raw);

      //把form里面pic 赋值 服务器传过来的图片路径
      this.ruleForm.pic = res.data.file_path;

      //给表单里的图片单独做一次检验
      this.$refs.ruleForm.validateField("pic");
    }, //在上传之前判断文件的格式是否合法,以及文件是否小于2M
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg" || "image/png" || "image/gif"; //图片是不是jpg格式
      const isLt2M = file.size / 1024 / 1024 < 2; //文件是否小于2M

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 图片 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
  },
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
.register {
  .el-dialog {
    .avatar-uploader .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
      border-color: #409eff;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      line-height: 178px;
      text-align: center;
    }
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
    .avatar-uploader {
      text-align: center;
    }
    .el-row {
      .el_col8 {
        padding-left: 24px !important;
        padding-right: 0px !important;
        button.el-button.el-button--default {
          width: 100%;
        }
      }
    }
    img.captcha {
      vertical-align: middle;
      width: 100%;
    }
    //底部按钮
    .el-dialog__footer {
      text-align: center;
    }
    //头部
    .el-dialog__header {
      text-align: center;
      /* color: #fff; */
      background-color: #0da3fa;
      //标题
      .el-dialog__title {
        color: #ffffff;
      }
    }
  }
}
</style>
