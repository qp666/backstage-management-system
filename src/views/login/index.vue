<template>
  <div class="login">
    <!-- 左边登录框 -->
    <div class="box_left">
      <div class="header">
        <img src="@/assets/mm.png" alt="" />
        <span>无事制作</span>
        <i></i>
        <span>用户登录</span>
      </div>
      <div class="input">
        <!-- 表单 -->
        <el-form
          :model="logForm"
          :rules="rules"
          ref="logForm"
          class="login-form"
        >
          <el-form-item prop="phone">
            <el-input
              placeholder="请输入手机号"
              v-model="logForm.phone"
              prefix-icon="el-icon-user"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              placeholder="请输入密码"
              v-model="logForm.password"
              prefix-icon="el-icon-lock"
              type="password"
            ></el-input>
          </el-form-item>
          <el-form-item prop="code">
            <el-row>
              <el-col :span="17">
                <el-input
                  placeholder="请输入验证码"
                  v-model="logForm.code"
                  prefix-icon="el-icon-key"
                ></el-input>
              </el-col>
              <el-col :span="7">
                <img
                  class="captcha"
                  ref="captcha"
                  @click="getRandomCode"
                  src="http://127.0.0.1/heimamm/public/captcha?type=login"
                  alt=""
                />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item class="rule-box" prop="checked">
            <el-checkbox v-model="logForm.checked">
              我已阅读并同意
              <el-link type="primary">用户协议</el-link>
              <span>和</span>
              <el-link type="primary">隐私条款</el-link>
            </el-checkbox>
          </el-form-item>
          <el-form-item class="btn-box">
            <el-button type="primary" @click="submitForm">登录</el-button>
            <el-button
              type="primary"
              @click="$refs.register.dialogVisible = true"
              >注册</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </div>
    <!-- 右边图片 -->
    <div class="img_right">
      <img src="@/assets/login_banner_ele.png" alt="" />
    </div>

    <!-- 注册框 -->
    <register ref="register"></register>
  </div>
</template>

<script>
import api from "@/utils/request.js";
import { setToken } from "@/utils/token.js";
import register from "./componets/register";
export default {
  name: "vue名",

  props: {},
  //数据FFF
  data() {
    return {
      logForm: {
        phone: "18511111111",
        password: "12345678",
        code: "1234",
        checked: false,
      },
      rules: {
        phone: [
          { required: true, message: "请输入手机号" },
          {
            pattern: /^1[34578]\d{9}$/,
            message: "目前只支持中国大陆的手机号码",
          },
        ],
        password: [
          { required: true, message: "密码不能为空" },
          { min: 6, max: 12, message: "密码长度为6~12个字符" },
        ],
        code: [
          { required: true, message: "验证码不能为空" },
          { min: 4, max: 4, message: "验证码长度为4" },
        ],
        checked: [
          {
            //因为checked的值不可能为空,所以不能拿值是否为空来判断
            //pattern就是数据的值,判断数据的值包含true嘛,如果不包含就显示必须同意用户协议
            pattern: /true/,
            message: "必须同意用户协议",
            //  trigger: "change"(在值改变的的时候判断)
            trigger: "change",
          },
        ],
      },
    };
  },
  //方法
  methods: {
    //更改验证码
    getRandomCode() {
      // 时间戳
      this.$refs.captcha.src = `http://127.0.0.1/heimamm/public/captcha?type=login&${Date.now()}`;
      // 随机数
      // this.$refs.captcha.src=`http://127.0.0.1/heimamm/public/captcha?type=login&${Math.random()}`
    },
    //表单验证
    submitForm() {
      this.$refs.logForm.validate((valid) => {
        if (valid) {
          //   alert("submit!");
          api
            .login({
              phone: this.logForm.phone,
              password: this.logForm.password,
              code: this.logForm.code,
            })
            .then((res) => {
              console.log("登录提示:", res);
              this.getRandomCode();

              if (res.data.code == 200) {
                //成功以后把token存起来
                window.localStorage.setItem("token", res.data.data.token);
                setToken(res.data.data.token); //调用存入token方法
                this.$router.push("/index"); //跳转到首页
              } else {
                this.$message(res.data.message);
              }
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
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
  components: {
    register,
  },
};
</script>

<style lang="less">
.login {
  width: 100%;
  height: 100%;
  background-image: linear-gradient(to right, #1494fa, #01c6fa);
  display: flex;
  justify-content: space-around;
  align-items: center;

  .box_left {
    width: 578px;
    height: 650px;
    background: rgba(245, 245, 245, 1);
    padding: 60px 50px;
    .header {
      font-family: SourceHanSansCN;
      font-size: 23px;
      font-weight: 600;
      color: rgba(12, 12, 12, 1);
      display: flex;
      align-items: center;
      span {
        margin-left: 12px;
      }
      span:nth-of-type(1) {
        margin-right: 12px;
      }
      i {
        display: inline-block;
        width: 1px;
        height: 28px;
        background: rgba(199, 199, 199, 1);
      }
    }

    .input {
      .login-form {
        .el-form-item.is-required {
          margin-top: 30px;
        }

        input.el-input__inner {
          height: 45px;
        }
        img.captcha {
          width: 100%;
        }
        .el-form-item.btn-box {
          .el-form-item__content {
            display: flex;
            flex-direction: column;

            button.el-button.el-button--primary {
              margin-top: 5px;
              margin-left: 0px;
              height: 50px;
            }
            button.el-button.el-button--primary:nth-of-type(2) {
              margin-top: 35px;
            }
          }
        }
      }

      .codeBox {
        display: flex;
      }
    }
  }
}
</style>
