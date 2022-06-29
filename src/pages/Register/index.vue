<template>
  <div class="register-container">
    <!-- 注册内容 -->
    <div class="register">
      <h3>
        注册新用户
        <span class="go"
          >我有账号，去 <router-link to="/login">登录</router-link>
        </span>
      </h3>
      <div class="content">
        <el-form
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="ruleForm"
          label-width="150px"
          :label-position="labelPosition"
          size="medium"
        >
          <el-form-item label="请输入手机号码" prop="phone">
            <el-input
              type="text"
              v-model="ruleForm.phone"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="获取并输入验证码" prop="code">
            <el-input
              type="text"
              v-model="ruleForm.code"
              autocomplete="off"
            ></el-input>
            <el-button
              style="margin-top: 5px"
              type="danger"
              @click="getVerifyCode"
              >获取验证码</el-button
            >
          </el-form-item>
          <el-form-item label="请输入密码" prop="password">
            <el-input
              type="password"
              v-model="ruleForm.password"
              autocomplete="off"
              show-password
            ></el-input>
            <el-alert title="（密码应包含大小写字母，且不少于6位）" type="info">
            </el-alert>
          </el-form-item>
          <el-form-item label="再次输入确认密码" prop="checkPass">
            <el-input
              type="password"
              v-model="ruleForm.checkPass"
              autocomplete="off"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              type="danger"
              :disabled="isDisabled"
              @click="userRegister('ruleForm')"
              >提交注册</el-button
            >
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <!-- 勾选协议 -->
      <div class="controls">
        <el-switch
          v-model="ruleForm.agree"
          active-color="#13ce66"
          inactive-color="#ffdada"
        >
        </el-switch
        >&nbsp;&nbsp;&nbsp;<span></span>
        <el-link
          >同意用户协议<i class="el-icon-view el-icon--right"></i>
        </el-link>
      </div>
    </div>

    <!-- 底部 -->
    <div class="copyright">
      <ul>
        <li>关于我们</li>
        <li>联系我们</li>
        <li>联系客服</li>
        <li>商家入驻</li>
        <li>营销中心</li>
        <li>手机值得买</li>
        <li>销售联盟</li>
        <li>值得买社区</li>
      </ul>
      <div class="address">地址：北京市丰台区汽车博物馆东路38号37层</div>
      <div class="beian">京ICP备19006430号</div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Register",
  data() {
    const validateTel = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入手机号"));
      } else {
        let phoneCodeVerification = /^1[3-9]\d{9}$/;
        if (!phoneCodeVerification.test(this.ruleForm.phone)) {
          callback(new Error("您输入的手机号不正确，请重新输入"));
        } else {
          callback();
        }
      }
    };
    const validateCode = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入验证码"));
      } else {
        callback();
      }
    };
    const validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        let passVerification =
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d~!@#$%^&*]{6,16}$/;
        if (!passVerification.test(this.ruleForm.password)) {
          callback(new Error("您输入的密码不符合规则，请重新输入"));
        } else {
          if (this.ruleForm.checkPass !== "") {
            this.$refs.ruleForm.validateField("checkPass");
          }
          callback();
        }
      }
    };
    const validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        phone: "",
        password: "",
        checkPass: "",
        code: "",
        agree: false,
      },
      rules: {
        phone: [{ validator: validateTel, trigger: "blur" }],
        code: [{ validator: validateCode, trigger: "blur" }],
        password: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
      },
      labelPosition: "left",
      disabled: true,
    };
  },
  // 控制输入全部表单元素之后，注册按钮才可用
  computed: {
    isDisabled: function () {
      const { phone, code, password, checkPass } = this.ruleForm;
      return !(phone && code && password && checkPass);
    },
  },
  methods: {
    async getVerifyCode() {
      const { phone } = this.ruleForm;
      if (phone) {
        try {
          await this.$store.dispatch("getVerifyCode", phone);
          this.ruleForm.code = this.$store.state.user.verifyCode;
        } catch (error) {}
      }
    },

    userRegister(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const { phone, code, password } = this.ruleForm;
          try {
            await this.$store.dispatch("userRegister", {
              phone,
              code,
              password,
            });
            this.$message({
              showClose: true,
              message: "注册成功！",
              type: "success",
            });
            await this.$router.push("/login");
          } catch (error) {}
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style lang="less" scoped>
.register-container {
  .register {
    width: 1200px;
    height: 800px;
    border: 1px solid rgb(223, 223, 223);
    margin: 0 auto;

    h3 {
      background: #ececec;
      margin: 0;
      padding: 6px 15px;
      color: #333;
      border-bottom: 1px solid #dfdfdf;
      font-size: 20.04px;
      line-height: 30.06px;

      span {
        font-size: 14px;
        float: right;

        a {
          color: #e1251b;
        }
      }
    }

    div:nth-of-type(1) {
      margin-top: 8px;
    }

    .content {
      padding-left: 350px;
      margin-bottom: 18px;
      position: relative;
      padding-right: 350px;

      label {
        font-size: 14px;
        width: 96px;
        text-align: right;
        display: inline-block;
      }

      input {
        width: 200px;
        height: 38px;
        padding-left: 8px;
        box-sizing: border-box;
        margin-left: 5px;
        outline: none;
        border: 1px solid #999;
      }

      img {
        vertical-align: sub;
      }

      .error-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: red;
      }
    }

    .controls {
      text-align: center;
      position: relative;
      margin-top: 50px;

      input {
        vertical-align: middle;
      }

      .error-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: red;
      }
    }

    .btn {
      text-align: center;
      line-height: 36px;
      margin: 17px 0 0 55px;

      button {
        outline: none;
        width: 270px;
        height: 36px;
        background: #e1251b;
        color: #fff !important;
        display: inline-block;
        font-size: 16px;
      }
    }
  }

  .copyright {
    width: 1200px;
    margin: 0 auto;
    text-align: center;
    line-height: 24px;

    ul {
      li {
        display: inline-block;
        border-right: 1px solid #e4e4e4;
        padding: 0 20px;
        margin: 15px 0;
      }
    }
  }
}
</style>
