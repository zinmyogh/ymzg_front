<template>
  <div>
    <div class="navbar">
      <div
        v-show="this.$router.currentRoute.path === '/account' || 
        this.$router.currentRoute.path === '/amount' || 
        this.$router.currentRoute.path === '/money' ||
        this.$router.currentRoute.path === '/check' ||
        this.$router.currentRoute.path === '/qrcode' ||
        this.$router.currentRoute.path === '/cash' ||
        this.$router.currentRoute.path === '/iframe' ||
        this.$router.currentRoute.path === '/relation'" 
        class="left">
        <van-icon name="arrow-left" @click="goBack" />
      </div>
      <div class="center">圆梦中国</div>
      <div v-if="!loginState" class="right" @click="goLogin">登录</div>
      <div v-else class="right" @click="logout">登出</div>
    </div>

    <div 
      v-if="this.$router.currentRoute.path === '/me' ||
            this.$router.currentRoute.path === '/home' ||
            this.$router.currentRoute.path === '/notice'" 
      style="margin-top: 46px;">
      <van-swipe :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="(image, index) in cimg" :key="index">
          <img :src="image.img" class="swipe-image" height="200px" width="100%" />
        </van-swipe-item>
      </van-swipe>
    </div>

    <!-- <transition name="fade-transform" mode="out-in">
      <router-view></router-view>
    </transition> -->

    <keep-alive>
      <transition name="fade-transform" mode="out-in">
        <router-view v-if="$route.meta.keepAlive">
            <!-- 这里是会被缓存的视图组件，比如 Home！ -->
        </router-view>
      </transition>
    </keep-alive>
    <transition name="fade-transform" mode="out-in">
      <router-view v-if="!$route.meta.keepAlive">
          <!-- 这里是不被缓存的视图组件，比如 Edit！ -->
      </router-view>
    </transition>

    <van-tabbar v-model="active" active-color="#ee0a24" inactive-color="#000" @change="onChange">
      <van-tabbar-item icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item icon="qr">推广</van-tabbar-item>
      <van-tabbar-item icon="bullhorn-o">公告</van-tabbar-item>
      <van-tabbar-item icon="manager-o">我的</van-tabbar-item>
    </van-tabbar>

  </div>
</template>

<script>
import { Toast } from 'vant'
import { mapState } from 'vuex'
import { getFirstPageImage, getImage } from '@/api/home'
import defaultSetting from '@/settings'
import { removeLOgin } from '@/utils/auth'
export default {
   data() {
    return {
      active: 0,
      images: []
    }
  },
  computed: {
    ...mapState({ loginState: state => state.user.login, userInfo: state => state.user.info, cimg: state => state.user.carouselImg })
  },
  created() {
    // this.getCarousel()
    // this.getQrImage()
    // this.getImageNotice()
  },
  methods: {
    goBack() {
      this.$router.go(-1)
      // console.log(this.$router.currentRoute.path)
    },
    goLogin() {
      this.$router.push('/login')
    },
    onClickLeft() {
      Toast('Back')
    },
    onClickRight() {
      Toast('Button')
    },
    onChange(index) {
      // console.log('index tag ... ', index)
      switch (index) {
        case 0:
          this.$router.push('/home')
          break
        case 1:
          this.$router.push('/qrcode')
          break
        case 2:
          this.$router.push('/notice')
          break
        case 3:
          this.$router.push('/me')
          break
        default:
          this.$router.push('/home')
          break
      }
    },
    logout() {
      window.localStorage.clear()
      // window.location.reload()
      removeLOgin()
      this.$store.commit('user/SET_LOGIN', false)
      this.$router.push('/login')
    },
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
    getCarousel() {
      const reqt = {
        Id: this.userInfo.Id,
        address: 1
      }
      getImage(reqt).then(resp => {
        // imgName:[1.png,2.png,3.png]
        // console.log('getImage ... ', resp)
        let res = resp.data.JsonData
        if (res.result === 'ok') {
          // this.images = res.imgname
          this.$store.commit('user/setCarouselImg', res.imgname)
          // console.log(this.images, 'this.images')
        }
      }).catch(err => {
        console.error(err)
      })
    },
    getQrImage() {
      const reqt = {
        address: 4
      }
      getImage(reqt).then(resp => {
        // console.log(resp, 'getImage.... ')
        let res = resp.data.JsonData
        if (res.result === 'ok') {
          // this.qrbgimg = res.imgname[0]
          this.$store.commit('user/setShareBg', res.imgname[0])
        }
      }).catch(e => {
        console.error(e)
      })
    },
    getImageNotice() {
        const reqt = {
          address: 2
        }
        getImage(reqt).then(resp => {
          // imgName:[1.png,2.png,3.png]
          // console.log('get home page image ', resp)
          let res = resp.data.JsonData
        if (res.result === 'ok') {
          this.noticeImg = res.imgname
          this.$store.commit('user/setNoticeImg', res.imgname)
          // console.log(this.images, 'this.images')
        }
        }).catch(err => {
          console.error(err)
        })
      },
  }
}
</script>

<style lang="scss" scoped>
.navbar {
    position: absolute;
    top: 0;
    z-index: 1000;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    align-items: center;
    height: 46px;
    width: 100%;
    line-height: 22px;
    text-align: center;
    background-color: #fff;
    -webkit-user-select: none;
    user-select: none;
    border-bottom: 1px solid #ebedf0;
    font-family: -apple-system,BlinkMacSystemFont,'Helvetica Neue',Helvetica,Segoe UI,Arial,Roboto,'PingFang SC',miui,'Hiragino Sans GB','Microsoft Yahei',sans-serif;
    .left {
      position: absolute;
      top: 15px;
      bottom: 0;
      left: 10px;
    }
    .center {
      max-width: 60%;
      margin: 0 auto;
      color: #323233;
      font-weight: 500;
      font-size: 16px;
    }
    .right {
      position: absolute;
      top: 0;
      bottom: 0;
      right: 0;
      display: -webkit-box;
      display: -webkit-flex;
      display: flex;
      -webkit-box-align: center;
      -webkit-align-items: center;
      align-items: center;
      padding: 0 16px;
      font-size: 14px;
      cursor: pointer;
      color: #ee0a24;
    }
}

// .my-swipe {
//   color: #fff;
//   font-size: 20px;
//   line-height: 150px;
//   text-align: center;
//   background-color: #39a9ed;
// }

.bank {
  cursor: pointer;
  -moz-user-select: none;
  -ms-user-select: none;
  -webkit-user-select: none;
  user-select: none;
}
.bank-name {
  font-size: 1.5vh;
  margin-top: 5px;
}


/* fade-transform */
.fade-transform-leave-active,
.fade-transform-enter-active {
  transition: all .3s;
}

.fade-transform-enter {
  opacity: 0;
  transform: translateX(-30px);
}

.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
