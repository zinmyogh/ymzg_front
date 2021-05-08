<template>
  <div class="login">
    <!-- <div class="l-header" @click="goHome">
      <van-icon name="arrow-left" />
      <font>返回首页</font>
    </div> -->
    <font color="red" size="3">登录不上请扫码重新下载</font>
    <img src="https://static.dbqapp.com/d0148200b1c382dc9bdadfede8ca2c12.png" alt="" style="width: 40%; margin-bottom: 20px; margin-top: 15px">
    <!-----------------------------------------Login Form------------------------------------------------------>
    <div class="login-form">
      <font size="5">用户登录</font>
      <van-form @submit="onSubmitLog">
        <van-field
          v-model="login.username"
          name="Username"
          label="账号"
          placeholder="请输入账号"
          :rules="[{ required: true, message: '账号必填' }]"
        />
        <van-field
          v-model="login.password"
          type="password"
          name="Password"
          label="密码"
          placeholder="请输入密码"
          :rules="[{ required: true, message: '密码必填' }]"
        />
        <div style="margin: 16px;">
          <van-button round block type="info" native-type="submit" :disabled="disableLogin">
            登录
          </van-button>
        </div>
      </van-form>
      <div class="bottom_">
        <div class="go-reg" @click="forgotPassword">忘记密码?</div>
        <div class="go-reg" @click="goRegister">立即注册</div>
      </div>
    </div>

  </div>
</template>

<script>
import { Toast } from 'vant'
import { mapState } from 'vuex'
import { setLOgin } from '@/utils/auth'
  export default {
    data() {
      return {
        login: {
          username: '',
          password: '',
        },
        disableLogin: false,
      }
    },
    computed: {
      ...mapState({ loginState: state => state.user.login })
    },
    created() {
      // console.log('login created ', this.$route.params)
      if (this.$route.params.phone) {
        this.login.username = this.$route.params.phone
      }
    },
    methods: {
      onSubmitLog() {
        // console.log('submit login lign ........')
        if(this.login.username === '' || this.login.password === '') {
          return Toast('请输入账号，密码！')
        }
        const reqt = {
          name: this.login.username,
          password: this.$md5(this.login.password),
          terminal: 'mobile'
        }
        this.disableLogin = true
        this.$store.dispatch('user/login', reqt)
          .then((res) => {
            // console.log('res login ', res)
            if (res.result === 'ok') {
              Toast({
                message: '登录成功',
                position: 'top'
              })
              this.disableLogin = false
              // this.loginState = true
              // localStorage.setItem('_login_', JSON.stringify(reqt))
              setLOgin(JSON.stringify(reqt))
              this.$router.push('/')
            } else {
              this.disableLogin = false
              Toast({
                message: '登录失败',
                position: 'top'
              })
            }
          }).catch(err => {
            this.disableLogin = false
            console.error(err)
          })
      },
      forgotPassword() {
        // console.log('ahoeiwhtfoawehtgoiaweh')
        this.$router.push('/forgot')
      },
      goRegister() {
        this.$router.push('/register')
      },
      goHome() {
        this.$router.push('/home')
      }
    }
  }
</script>

<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100vh;
  background: #f5f5f5;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  position: relative;
  .l-header {
    position: absolute;
    top: 10px;
    left: 10px;
    font-size: 4vh;
    display: flex;
    font{
      font-size: 2.5vh;
      margin-left: 5px;
      color: #7c7c7c;
    }
  }
  .login-form{
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    font{
      margin-bottom: 10px;
    }
    .bottom_{
      display: flex;
      justify-content: space-around;
    }
    .go-reg{
      color: grey;
      font-size: 2.3vh;
      cursor: pointer;
      margin: 0 40px;
    }
  }
}
</style>