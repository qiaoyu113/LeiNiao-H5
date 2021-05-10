<template>
  <div class="resetPwd">
    <van-nav-bar
      title="修改密码"
      left-text="返回"
      left-arrow
      :readonly="isReadonly"
      @click-left="onClickLeft"
    />
    <van-form ref="pwdFromRef" :show-error="false">
      <van-field
        v-model="pwdFrom.oldPwd"
        :readonly="isReadonly"
        label="原密码"
        clearable
        :border="false"
        :type="hideFrom.oldType"
        maxlength="16"
        name="用户名"
        :rules="[{ required: true, message: message.oldMsg }]"
        :placeholder="message.oldMsg"
      >
        <template #button>
          <van-icon
            class="icon-eye"
            :name="hideFrom.oldType === 'password' ? 'closed-eye' : 'eye-o'"
            @click="hidePwd('oldType')"
          />
        </template>
      </van-field>
      <van-field
        v-model="pwdFrom.newPwd"
        :readonly="isReadonly"
        label="新密码"
        maxlength="16"
        clearable
        :border="false"
        :type="hideFrom.newType"
        :rules="[
          { required: true, message: message.newMsg },
          {
            validator: validateReg,
            message: message.notSpecification
          }
        ]"
        :placeholder="message.newMsg"
        @input="checkRejPwd"
      >
        <!-- style="margin-top:28px;border-top:1px solid #e4e4e4" -->
        <template #button>
          <van-icon
            class="icon-eye"
            :name="hideFrom.newType === 'password' ? 'closed-eye' : 'eye-o'"
            @click="hidePwd('newType')"
          />
        </template>
      </van-field>
      <van-field
        v-model="pwdFrom.rejectPwd"
        :readonly="isReadonly"
        :type="hideFrom.rejectType"
        clearable
        :border="false"
        label="确认新密码"
        maxlength="16"
        name="rejectPwd"
        :rules="[
          { required: true, message: message.regMsg },
          {
            validator: verifyeQuality,
            message: message.notEqual,
            trigger: 'onChange'
          }
        ]"
        :placeholder="message.regMsg"
      >
        <template #button>
          <van-icon
            class="icon-eye"
            :name="hideFrom.rejectType === 'password' ? 'closed-eye' : 'eye-o'"
            @click="hidePwd('rejectType')"
          />
        </template>
      </van-field>
      <div class="description">
        <p>说明:</p>
        <p>1、如忘记原密码，请联系管理员进行密码找回</p>
        <p>
          2、密码规则：新密码必须包含8-16位的数字+大写字母+小写字母，且不能为：Aa123456此类简单组合
        </p>
      </div>
      <div class="submit-btn">
        <van-button
          v-preventreclick
          type="info"
          block
          color="#188FF9"
          :disabled="isDisabld"
          native-type="button"
          @click="resetPwd"
        >
          确认修改
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { updateUserPwd } from '@/api/user'
export default {
  name: 'ResetPwd',
  props: {},
  data() {
    return {
      isReadonly: true,
      pwdFrom: {
        oldPwd: '',
        newPwd: '',
        rejectPwd: ''
      },
      hideFrom: {
        oldType: 'password',
        newType: 'password',
        rejectType: 'password'
      },
      message: {
        oldMsg: '请输入原密码',
        newMsg: '请输入新密码',
        regMsg: '再次确认新密码',
        notSpecification: '新密码必须为8-16位的数字+大写字母+小写字母',
        notEqual: '确认新密码与新密码不一致'
      },
      showPWd: false
    }
  },
  computed: {
    isDisabld() {
      return !(this.pwdFrom.oldPwd && this.pwdFrom.newPwd && this.pwdFrom.rejectPwd)
    }
  },
  mounted() {
    // 防止浏览器自动填入密码
    setTimeout(() => {
      this.isReadonly = false
    })
  },
  methods: {
    onClickLeft() {
      if (this.$route.params.isLogin) {
        this.$store.commit('user/SETRESETPWD', false)
        localStorage.clear();
        this.$router.replace({
          name: 'login'
        })
      }
      // if (this.$route.params.isLogin) return

      this.$router.replace({ path: '/myCenter' })
    },
    async resetPwd() {
      try {
        await this.$refs.pwdFromRef.validate()
        this.changePassword()
      } catch (error) {
        return error
      }
    },
    verifyeQuality() {
      const { newPwd, rejectPwd } = this.pwdFrom
      return newPwd === rejectPwd
    },
    async checkRejPwd() {
      if (this.pwdFrom.rejectPwd) {
        this.timer && clearTimeout(this.timer)
        this.timer = setTimeout(async() => {
          try {
            this.$refs.pwdFromRef.resetValidation('rejectPwd')
            await this.$refs.pwdFromRef.validate('rejectPwd')
          } catch (error) {
            return error
          }
        }, 200)
      }
    },
    hidePwd(item) {
      this.hideFrom[item] = this.hideFrom[item] === 'password' ? 'text' : 'password'
    },
    validateReg(str = '') {
      // const str = ''
      const notAZ = /^([A-Z])([a-z])([1])([2])([3])([4])([5])([6])$/
      const regPWd = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z0-9]{8,16}$/
      var s = str.substring(0, 10)
      if (notAZ.test(s)) {
        s = s.toUpperCase()
        if (s[0] === s[1]) {
          return false
        }
      }
      return regPWd.test(str)
    },
    async changePassword() {
      try {
        this.$loading(true)
        const obj = {
          oldPassword: this.pwdFrom.oldPwd,
          password: this.pwdFrom.newPwd
        }
        const { data } = await updateUserPwd(obj)
        console.log(data)
        if (!data.success) return this.$fail(data.errorMsg || '密码修改失败，请稍后重试')
        this.$toast.success('密码修改成功')
        this.$store.commit('user/SETRESETPWD', false)
        const timeR = setTimeout(() => {
          this.$router.push({ path: '/myCenter' })
        })
        this.$once('hook:beforeDestroy', () => {
          window.clearTimeout(timeR)
        }, 1500)
        if (!data) {
          this.$fail('密码修改失败，请稍后重试')
        }
      } catch (error) {
        return error
      } finally {
        this.$loading(false)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .van-cell{
    margin-bottom: 5px;
    &:first-child{
        padding-top: 20px;
    }
    .van-cell__title{
        span{
            font-size: 14px;
            font-weight: 400;
            color: #000000;
        }
    }
}
::v-deep .van-button--plain.van-button--info{
    border-color: #188FF9;
    opacity: 1;
    .van-button__text{
        color:#188FF9;
    }
}
::v-deep .van-button{
    height: 48px;
    line-height: 48px;
}
.resetPwd {
  width: 100%;
  background:#FBFBFB;
}
.cell-top {
  margin-top: 20px;
  border-top: 1px solid #e4e4e4;
  border-bottom: 1px solid #e4e4e4;
  color: #333;
  font-weight: 600;
  font-size: 22px;
}
.description {
  margin-top: 24px;
  padding: 0 25px;
  p {
    font-size: 12px;
    color: #9B9B9B;
    margin: 3px 0;
  }
}
.icon-eye {
  font-size: 17px;
}
.submit-btn {
  width: 100%;
  position: fixed;
  bottom:0;
}
</style>
