<template>
  <div class="login">
    <div class="logo" />
    <h1 class="title">
      雷鸟综合业务支撑平台
    </h1>
    <van-form ref="loginForm" :show-error="false" class="form" @submit="onSubmit">
      <van-field
        v-model="loginForm.account"
        name="validatorAccount"
        placeholder="请输入账号"
        :border="false"
        :rules="[
          { required: true, message: '请输入账号' },
          { validator: validatorAccount, message: '请输入正确的账号' }
        ]"
      >
        <div slot="left-icon">
          <img src="./imgs/phone@2x.png" alt="" class="phoneIcon">
        </div>
      </van-field>
      <van-field
        v-model="loginForm.password"
        left-icon="smile-o"
        type="password"
        :border="false"
        name="validatorPassword"
        placeholder="密码"
        :rules="[
          { required: true, message: '请输入密码' },
          { validator: validatorPassword, message: '请输入正确的密码' }
        ]"
      >
        <div slot="left-icon">
          <img src="./imgs/lock@2x.png" alt="" class="lockIcon">
        </div>
      </van-field>
      <van-button v-preventreclick type="info" block class="loginBtn">
        登录
      </van-button>
    </van-form>
  </div>
</template>
<script>
import { Form, Field, Icon, Button } from 'vant';
import { phoneRegExp, debounce } from '@/utils/index'
export default {
  name: 'Login',
  components: {
    [Form.name]: Form,
    [Field.name]: Field,
    [Icon.name]: Icon,
    [Button.name]: Button

  },
  data() {
    return {
      loginForm: {
        account: '', // 账号
        password: '', // 密码
        phone: '', // 手机号
        code: '' // 手机验证码
      },
      loginWay: 'account', // 登录方式
      isSendCode: false, // 发送验证码是否正在倒计时
      count: 60 // 倒计时的秒数
    };
  },
  computed: {
    isShowPop() {
      return this.$store.getters['user/getReset']
    }
  },
  mounted() {
    this.phonePattern = phoneRegExp
  },
  beforeDestroy() {
    this.clearTimer()
  },
  methods: {
    /**
     * 登录
     */
    onSubmit: debounce(async function() {
      this.$store.dispatch('user/login', this)
    }, 200),
    /**
     * 切换登录方式
     */
    handleChangeLoginWay() {
      this.$refs.loginForm.resetValidation()
      if (this.loginWay === 'account') {
        this.loginWay = 'code'
      } else {
        this.loginWay = 'account'
      }
    },
    /**
     *获取验证码
     */
    handleGetCodeClick() {
      // 正在倒计时或者手机号不合法
      if (this.isSendCode || !phoneRegExp.test(this.loginForm.phone)) {
        return false
      } else {
        // 调方法获取手机验证码
        this.getPhoneCode()
      }
    },
    /**
     * 获取手机验证码
     */
    getPhoneCode() {
      try {
        this.isSendCode = true
        this.timer = setInterval(() => {
          if (this.count > 1) {
            this.count--
          } else {
            this.clearTimer()
          }
        }, 1000)
      } catch (err) {
        this.clearTimer()
      }
    },
    /**
     * 清除定时器
     */
    clearTimer() {
      clearInterval(this.timer)
      this.timer = null
      this.count = 60
      this.isSendCode = false
    },
    /**
     * 手机验证码校验
     */
    validatorCode(val) {
      return val.length === 4
    },
    /**
     * 校验密码
     */
    validatorPassword() {
      return true
    },
    /**
     * 校验账号
     */
    validatorAccount(val) {
      let isTrue = /\d{8,11}/.test(val)
      return isTrue
      // if (phoneRegExp.test(val)) {
      //   return true
      // }
      // return false
    },
    // 强制跳转
    resetPwd() {
      this.$router.push({
        name: 'ResetPwd',
        params: {
          isLogin: true
        }
      })
    }
  }
};
</script>
<style lang="scss" scoped>
.login {
  font-family: PingFangSC-Regular;
  width: 100%;
  height: 100vh;
  -webkit-background-size: cover;
  background-size: cover;
  overflow: hidden;
  .logo {
    width: 60px;
    height: 60px;
    background: url("./imgs/logo.svg") no-repeat;
    -webkit-background-size: cover;
    background-size: cover;
    margin: 60px auto 20px;
  }
  .title{
    font-size: 21px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #4A4A4A;
    line-height: 30px;
    text-align: center;
  }
  .form {
    margin:37.5px;
    .loginBtn {
        height: 39px;
        background: linear-gradient(270deg, #0064F3 0%, #188FF9 100%);
        border-radius: 5px;
        font-size: 15px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #FFFFFF;
        margin-top: 50px;
    }
    .loginWay {
      display: inline-block;
      margin-top:6.5px;
      font-size: 11px;
      color: #838A9D;
    }
    .code {
      font-size: 13px;
      color: #649CEE;
    }
    .phoneIcon {
      width: 18px;
      height:18px;
      vertical-align: middle;
    }
    .lockIcon {
     object-fit: contain;
      width: 18px;
      height:18px;
      vertical-align: middle;
    }
  }
  .login-pop{
    width: 70%;
    height: 30%;
    padding: 10px 8px;
    display: flex;
    flex-wrap:wrap ;
    align-items: center;
    justify-content: center;
    & p:first-child {
      font-size: 18px;
      font-weight: 700;

    }
    p{
      text-align: center;
      color:#333;
      font-size:15px;
      margin: 0;
    }
    .resetPwd{
      width: 60%;
    }
  }
  .domain-text{
    width: 100%;
    text-align: center;
    color:#999;
    position: fixed;
    bottom: 20px;
    a{
      color:#999;
    }
  }
}
::v-deep.van-cell{
    background: #F8FAFD;
    border-radius: 4px;
    margin-bottom: 15px;
}
::v-deep.van-field__control::-webkit-input-placeholder{
    font-size: 15px;
}
</style>
