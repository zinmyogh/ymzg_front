<template>
  <div class="splash-screen">
    <img class="splash" :src="downloadImg(img)" alt="">
    <div class="show-time" @click="skipToLogin()">{{ timeGo }}</div>
  </div>
</template>

<script>
import { getLoginImage, getImage } from '@/api/home'
import defaultSetting from '@/settings'
import { getLOgin } from '@/utils/auth'
export default {
  data() {
    return {
      timeGo: 3,
      s_time: null,
      img: ''
    }
  },
  created() {
    this.getLoginImg()
  },
  methods: {
    downloadImg(imgName) {
      // console.log('send imagname ', imgName)
      // let srcImg =
      //   "http://" +
      //   defaultSetting.ip +
      //   ":" +
      //   4195 +
      //   "/download?imgName=" +
      //   imgName;
      let srcImg = defaultSetting.imgUrl + imgName
        // console.log('src images ', srcImg)
      return srcImg;
    },
    getLoginImg() {
      const reqt = {
        address: 3  // 1.homeCarousel 2.noticeImages 3.AppFirstImage 4.QrBackgroundImage
      }
      // console.log('send get login images ')
      getImage(reqt).then(resp => {
        // console.log('getLoginImage ... ', resp)
        let res = resp.data.JsonData
        if (res.result === 'ok') {
          this.img = res.imgname[0]
        }
      }).catch(e => {
        console.error(e)
      })
    },
    skipToLogin() {
      // clearInterval(this.s_time)
      // this.$router.push('/')
    },
    login() {
      // const reqt = JSON.parse(localStorage.getItem('_login_'))
      // console.log(getLOgin())
      const reqt = JSON.parse(getLOgin())
      this.$store.dispatch('user/login', reqt)
        .then((res) => {
          // console.log('res login ', res)
          if (res.result === 'ok') {
            // Toast({
            //   message: '登录成功',
            //   position: 'top'
            // })
            // this.loginState = true
            // localStorage.setItem('_login_', JSON.stringify(reqt))
            this.$router.push('/')
          } else {
            // Toast({
            //   message: '登录失败',
            //   position: 'top'
            // })
          }
        }).catch(err => {
          console.error(err)
        })
    },
  },
  mounted() {
    if (this.s_time != null) {
      clearInterval(this.s_time)
      this.s_time = null
    }
    this.s_time = setInterval(() => {
      // this.$router.push('/about')
      this.timeGo = this.timeGo - 1
      if (this.timeGo === 0) {
        if (getLOgin() != null || getLOgin() != undefined) {
            this.login()
            clearInterval(this.s_time)
            this.s_time = null
          } else {
            this.$router.push('/login')
            clearInterval(this.s_time)
            this.s_time = null
          }
        // this.$router.push('/login')
        // clearInterval(this.s_time)
        // this.s_time = null
      }
    }, 1000)
    // this.$router.push('/login')
  }
}
</script>

<style lang="scss" scoped>
.splash-screen {
  width: 100%;
  height: 100vh;
  background: #000;
  position: relative;
  .splash {
    width: 100%;
    height:100%;
    background-size: cover;
    background-repeat: no-repeat;
  }
  .show-time{
    position: absolute;
    right: 10px;
    bottom: 20px;
    color: white;
    width: 80px;
    height: 40px;
    background: #b1b1b141;
    text-align: center;
    line-height: 40px;
    border-radius: 10px;
  }
}

</style>
