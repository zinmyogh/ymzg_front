<template>
  <div class="login">

    <div class="login-form">
      <font size="5">重置密码</font>
      <van-form @submit="changePassword">
        
        <van-field
          v-model="register.phone"
          name="Phone"
          label="手机号"
          placeholder="请输入手机号"
          :rules="[{ required: true, message: '手机号必填' }]"
        />
        <van-field v-model="code" center clearable label="验证码" placeholder="请输入验证码">
          <template #button>
            <van-button size="small" type="primary" :disabled="canClick" @click="getCode">{{ content }}</van-button>
          </template>
        </van-field>
        
        <van-field
          v-model="register.password"
          type="password"
          name="Password"
          label="新密码"
          placeholder="请输入密码"
          :rules="[{ required: true, message: '密码必填' }]"
        />
        <div style="margin: 16px;">
          <van-button round block type="primary" native-type="submit">
            立即重置
          </van-button>
        </div>
      </van-form>
      <span class="go-reg" @click="goLogin">返回立即登录</span>
    </div>
  </div>
</template>

<script>
import { Toast } from 'vant'
import $axios from 'axios'
import { editPassword } from '@/api/user'
  export default {
    data() {
      return {
        register: {
          password: '',
          phone: '',
        },
        code: '',
        gCode: '',
        content: '发送验证码',
        totalTime: 60,
        canClick: false // 添加canClick
      }
    },
    methods: {
      randomCode(min, max) {
        return Math.floor(Math.random() * (max - min) + min)
      },
      getCode () {
        if (this.register.phone === '') return
        if (this.canClick) return  // 改动的是这两行代码
        this.canClick = true
        // Toast({
        //   position: 'top',
        //   message: '验证码已发送至您的手机'
        // })
        this.gCode = this.randomCode(1000, 9999)
        // console.log(this.gCode)
        this.authCode(this.register.phone, `【圆梦中国】您的验证码是 ${this.gCode} `)
        this.content = this.totalTime + 's'
        let clock = window.setInterval(() => {
          this.totalTime--
          this.content = this.totalTime + 's'
          if (this.totalTime < 0) {
          window.clearInterval(clock)
          this.content = '重新发送'
          this.totalTime = 60
          this.canClick = false  // 这里重新开启
          }
        },1000)
      },
      authCode(phone, content) {
        let data = {
          'u': '19808830747',  
          'p': this.$md5('aa123456'),
          'm': phone,
          'c': content
        }
        // console.log('send data ', data, '\n', `/apis/sms?u=${'19808830747'}&p=${this.$md5('aa123456')}&m=${phone}&c=${encodeURIComponent(content)}`)
        // console.log($axios(), '$axios ....')
        // $axios({
        //   method: 'GET',
        //   url: `http://api.smsbao.com/sms?${encodeURIComponent(content)}`
        // }).then(resp => {
        //   console.log('msgmsgmsmgsmgsmgmsgm .........', resp)
        //   this.statusStr(resp)
        // }).catch(err => {
        //   console.error(err)
        // })
        const httpHandler = $axios.create({
            headers: { "Content-Type": "application/json;charset=utf-8" }, //即将被发送的自定义请求头
            withCredentials: true //表示跨域请求时是否需要使用凭证
        });
        let url = `apis/sms?u=${'19808830747'}&p=${this.$md5('aa123456')}&m=${phone}&c=${encodeURIComponent(content)}`
        httpHandler.get(url).then(resp => {
          // console.log('resp ', resp)
          this.statusStr(resp.data)
        }).catch(e => {
          console.error(e)
        })
      },
      statusStr(result) {
        switch (result) {
            case 0:
                Toast('短信发送成功')
                break
            case -1:
                Toast('参数不全')
                break
            case -2:
                Toast('服务器空间不支持,请确认支持curl或者fsocket，联系您的空间商解决或者更换空间！')
                break
            case 30:
                Toast('密码错误')
                break
            case 40:
                Toast('账户不存在')
                break
            case 41:
                Toast('余额不足')
                break
            case 42:
                Toast('账户已过期')
                break
            case 43:
                Toast('IP地址限制')
                break
            case 50:
                Toast('内容含有敏感字')
                break
          }
      },
      changePassword() {
        if (this.password === '') {
          Toast('请输入新密码')
          return
        }
        // if (this.code !== this.gCode.toString()) {
        //   return Toast({
        //     position: 'top',
        //     message: '验证码不正确！'
        //   })
        // }
        const reqt = {
          name: this.register.phone,
          pw: this.$md5(this.register.password) // pw加密并加盐后md5, 盐同注册
        }
        // console.log('pass ', reqt)
        editPassword(reqt).then(resp => {
          // console.log('editPassword ... ', resp)
          let res = resp.data.JsonData
          if (res.result === 'ok') {
            Toast('密码重置成功')
            const lg = {
              name: this.register.phone,
              password: this.$md5(this.register.password),
              terminal: 'mobile'
            }
            this.register.password = ''
            // console.log('this.userInfo ... ', this.userInfo, lg)
            localStorage.setItem('_login_', JSON.stringify(lg))
            this.$router.push({name: 'Login', params: {phone: this.register.phone}})
          } else {
            Toast("密码重置失败")
          }
        }).catch(err => {
          console.error(err)
        })
      },
      goLogin() {
        this.$router.push('/login')
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
  box-sizing: border-box;
  padding: 20px;
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
    .go-reg{
      color: grey;
      font-size: 2vh;
      cursor: pointer;
    }
  }
}
</style>