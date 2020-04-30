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
        <el-form-item label="头像" :label-width="formLabelWidth" prop="pic">
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
        <el-form-item label="昵称" :label-width="formLabelWidth" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
          <el-input clearable v-model="ruleForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" :label-width="formLabelWidth" prop="phone">
          <el-input clearable v-model="ruleForm.phone"></el-input>
        </el-form-item>
        <el-form-item
          label="密码"
          :label-width="formLabelWidth"
          prop="passWord"
        >
          <el-input show-password v-model="ruleForm.passWord"></el-input>
        </el-form-item>
        <el-form-item label="图形码" :label-width="formLabelWidth" prop="code">
          <el-row :gutter="20">
            <el-col :span="15">
              <el-input v-model="ruleForm.code"></el-input>
            </el-col>
            <el-col class="el_col8" :span="8">
              <img
                class="captcha"
                ref="captcha"
                :src="imgURL"
                @click="getImgURL"
                alt=""
              />
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="验证码" :label-width="formLabelWidth" prop="ycode">
          <el-row :gutter="20">
            <el-col :span="15">
              <el-input v-model="ruleForm.ycode"></el-input>
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
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="getRegister">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import api from "@/utils/request.js";

export default {
  name: "register",

  props: {},
  //数据
  data() {
    return {
      //表单的左边文字距离
      formLabelWidth: "80px",
      //验证码图片 调用环境变量
      imgURL: process.env.VUE_APP_URL + "/captcha?type=sendsms",
      picU: "http://127.0.0.1/heimamm/public" + "/uploads", //头像路径接口
      imageUrl: "",
      dialogVisible: false,
      timer: "",
      times: 10,
      isTrue: true,

      ruleForm: {
        pic: "", //头像
        name: "", //用户名
        email: "", //邮箱
        phone: "", //手机
        passWord: "", //密码
        code: "", //图形码
        ycode: "", //手机验证码
      },
      rules: {
        pic: [{ required: true, message: "请选择你的头像", trigger: "blur" }],
        name: [
          //required:true (必须输入内容) ,如果内容为空就显示 (message) , trigger: "blur"(在失去焦点的时候判断)
          { required: true, message: "请输入您的昵称", trigger: "blur" },
        ],
        //密码验证
        passWord: [
          //required:true (必须输入内容) ,如果内容为空就显示 (message) , trigger: "blur"(在失去焦点的时候判断)
          { required: true, message: "请输入您的密码", trigger: "blur" },
          //min: 3, max: 5 (最小3位,最大5位) ,如果内容不符合要求就显示 (message) , trigger: "blur"(在失去焦点的时候判断)
          {
            min: 6,
            max: 10,
            message: "密码长度在 6 到 10 个字符",
            trigger: "change",
          },
        ],
        email: [
          { required: true, message: "请输入您的邮箱", trigger: "blur" },
          {
            //pattern就是数据的值,判断数据的值包含
            pattern: /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/,
            message: "邮箱输入错误",
            //  trigger: "change"(在值改变的的时候判断)
            trigger: "blur",
          },
        ],
        phone: [
          { required: true, message: "请输入您的手机号码", trigger: "blur" },
          {
            //pattern就是数据的值,判断数据的值包含
            pattern: /0?(13|14|15|18|17)[0-9]{9}/,
            message: "手机号输入错误",
            //  trigger: "change"(在值改变的的时候判断)
            trigger: "blur",
          },
        ],
        code: [
          //required:true (必须输入内容) ,如果内容为空就显示 (message) , trigger: "blur"(在失去焦点的时候判断)
          { required: true, message: "请输入右边的图形码", trigger: "blur" },
          { len: 4, message: "图形验证码是4位数", trigger: "blur" },
        ],
        ycode: [
          //required:true (必须输入内容) ,如果内容为空就显示 (message) , trigger: "blur"(在失去焦点的时候判断)
          {
            required: true,
            message: "请输入获取到的手机验证码",
            trigger: "blur",
          },
          {
            len: 4,
            message: "手机验证码是4位数",
            trigger: "blur",
          },
        ],
      },
    };
  },
  //方法
  methods: {
    //点击确定注册
    getRegister() {
      //表单验证
      this.$refs.ruleForm.validate((v) => {
        if (v) {
          // alert("提交成功!");
          //全部成功的话就发送axios请求
          api
            .register({
              username: this.ruleForm.name,
              phone: this.ruleForm.phone,
              email: this.ruleForm.email,
              avatar: this.ruleForm.pic,
              password: this.ruleForm.passWord,
              rcode: this.ruleForm.ycode,
            })
            .then((res) => {
              console.log("注册后返回:", res);
              if (res.data.code == 200) {
                this.$message.success("你已经注册成功");
                //注册成功后关闭表单
                this.dialogVisible = false;
                //清空表单
                this.$refs.ruleForm.resetFields();
                //清空表单不会清空表单外的img路径,需要手动清空
                this.imageUrl = "";
                //重新给服务器发送请求获取验证码
                this.getImgURL();
              } else {
                this.$message.error("注册失败:" + res.data.message);
              }
            });
        } else {
          this.$message.warning("注册失败:请正确填写");
          console.log("提交失败,至少有一项填的不标准");
          return false;
        }
      });
    },
    //取消注册
    cancel() {
      //重置表单
      this.$refs.ruleForm.resetFields();
      //清空表单不会清空表单外的img路径,需要手动清空
      this.imageUrl = "";
      //重新获取图形码
      this.getImgURL();
      this.dialogVisible = false;
    },
    //获取图形码
    getImgURL() {
      //重新给服务器发送请求获取验证码
      this.imgURL =
        process.env.VUE_APP_URL + "/captcha?type=sendsms&sb=" + Date.now(); // 时间戳Date.now()
    },
    //验证码获取
    userCode() {
      //进行判断手机号是否输入正确
      //如果输入错误就弹出提示框, return阻止后面的代码运行
      if (!/0?(13|14|15|18|17)[0-9]{9}/.test(this.ruleForm.phone)) {
        this.$message.error("手机号输入错误");
        return;
      }
      //进行判断验证码格式是否输入正确
      //如果输入错误就弹出提示框, return阻止后面的代码运行
      if (this.ruleForm.code.length != 4) {
        this.$message.error("验证码格式错误");
        return;
      }
      if (!this.isTrue) return;
      this.isTrue = false;
      api
        .register_note({ code: this.ruleForm.code, phone: this.ruleForm.phone })
        .then((res) => {
          //成功回调
          console.log("获取短信验证码:", res);
          // alert(res.data.message);
          if (res.data.code == 200) {
            //弹出成功提示框
            this.$message.success("获取到验证码是" + res.data.data.captcha);
          } else {
            //弹出失败提示框
            this.$message.error(res.data.message);
          }
        });
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
          //清空表单
          this.cancel();
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
      .el-col.el-col-15 {
        padding-left: 0px !important;
        padding-right: 0px !important;
      }
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
