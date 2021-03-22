<template>
  <div class="notice">

    <!-- <van-swipe :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <img :src="downloadImg(image)" class="swipe-image" height="200px" width="100%" />
      </van-swipe-item>
    </van-swipe> -->

    <div class="tt-line">
      <span></span>
      <font>公告消息</font>
    </div>

    <div class="n-c">
      <div class="notice-container">
        <div class="title">{{ bulletin.title }}</div>
        <span class="line"></span>
        <div class="notice-msg">
          {{ bulletin.content }}
        </div>
      </div>
    </div>

    <div class="tt-line">
      <span></span>
      <font>学习文件</font>
    </div>

    <div class="adv">
      <div class="adv-container" v-for="(l,i) in link" :key="i">
        <div class="adv-msg">
          <!-- <a :href="l.content" target="_blank"><u>{{ l.title }}</u></a> -->
          <span @click="openNew(l.content)" style="color: blue;"><u>{{ l.title }}...</u></span>
        </div>
      </div>
    </div>

    <div class="tt-line">
      <span></span>
      <font>消息介绍</font>
    </div>

    <div class="aimg">
      <div class="aimg-container" v-for="(i, index) in noticeImg" :key="index">
        <img :src="downloadImg(i)" alt="">
        <!-- <img src="https://images.pexels.com/photos/210607/pexels-photo-210607.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt="">
        <img src="https://images.pexels.com/photos/210607/pexels-photo-210607.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt="">
        <img src="https://images.pexels.com/photos/210607/pexels-photo-210607.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt=""> -->
      </div>
    </div>

    <div class="bottom">&nbsp;</div>
  </div>
</template>

<script>
import { getHomePageImage, getLink, getBulletin } from '@/api/notice'
import {  getImage } from '@/api/home'
import { mapState } from 'vuex'
import defaultSetting from '@/settings'
  export default {
    data() {
      return {
        images: [
          // 'https://images.pexels.com/photos/5740574/pexels-photo-5740574.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
          // 'https://images.pexels.com/photos/6168330/pexels-photo-6168330.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
          // 'https://images.pexels.com/photos/5661243/pexels-photo-5661243.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
          // 'https://images.pexels.com/photos/6625398/pexels-photo-6625398.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
        ],
        noticeImg: [],
        bulletin: {
          content: '',
          title: ''
        },
        link: []
      }
    },
    destroyed() {
      // console.log('desytoryed ==========')
      this.noticeImg = []
      this.bulletin = {}
      this.link = []
      this.images = []
    },
    computed: {
      ...mapState({ userInfo: state => state.user.info })
    },
    created() {
      this.getImage()
      this.getlink()
      this.getCarousel()
      this.getBulletin()
    },
    methods: {
      openNew(i) {
        // window.open(i, '_system')
        // window.open(i, '_blank')
        this.$router.push({name: 'IFrame', params: {link: i}})
        // Browser.window.open(i)
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
      downloadImg(imgName) {
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
      getBulletin() {
        const reqt = {}
        getBulletin().then(resp => {
          // console.log('getBulletin ... ', resp)
          let res = resp.data.JsonData
          if (res.result === 'ok') {
            this.bulletin.title = res.title
            this.bulletin.content = res.content
          }
        }).catch(err => {
          console.error(err)
        })
      },
      getImage() {
        const reqt = {
          address: 2
        }
        getImage(reqt).then(resp => {
          // imgName:[1.png,2.png,3.png]
          // console.log('get home page image ', resp)
          let res = resp.data.JsonData
        if (res.result === 'ok') {
          this.noticeImg = res.imgname
          // console.log(this.images, 'this.images')
        }
        }).catch(err => {
          console.error(err)
        })
      },
      getlink() {
        getLink().then(resp => {
          // link:[aaa.com,bbb.com,ccc.com]
          // console.log('get link ', resp)
          let res = resp.data.JsonData
          if (res.result === 'ok') {
            this.link = res.data
          }
        }).catch(err => {
          console.error(err)
        })
      },
    //   getCarousel() {
    //   const reqt = {
    //     Id: this.userInfo.Id
    //   }
    //   getFirstPageImage(reqt).then(resp => {
    //     // imgName:[1.png,2.png,3.png]
    //     // console.log('getFirstPageImage ... ', resp)
    //     let res = resp.data.JsonData
    //     if (res.result === 'ok') {
    //       this.images = res.imgname
    //       // console.log(this.images, 'this.images')
    //     }
    //   }).catch(err => {
    //     console.error(err)
    //   })
    // },
    },
    
  }
</script>

<style lang="scss" scoped>
.notice {
  // margin-top: 46px;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background: #f5f5f5;
  .n-c{
    padding: 10px;
  }
  .notice-container {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    background: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 1px solid #e6e6e6;
    word-wrap: break-word;
    padding: 10px;
    .title{
      font-size: 4vh;
      color: #212121;
      margin-bottom: 10px;
    }
    // .line {
    //   border: 1px solid #eee;
    //   width: 100%;
    // }
    .notice-msg{
      font-size: 2.7vh;
      width: 100%;
      color: #424242;
      word-wrap: break-word;
      text-align: center;
      margin-bottom: 10px;
      // -moz-user-select: none;
      // -webkit-user-select: all;
      // user-select: all;
    }
  }


  .aimg{
    padding: 10px;
    margin-bottom: 50px;
  }
  .aimg-container {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    background: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 1px solid #e6e6e6;
    word-wrap: break-word;
    padding: 10px;
    img{
      width: 100%;
      height: auto;
      margin: 10px 0;
    }
  }

  .adv{
    padding: 10px;
  }
  .adv-container {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    background: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 1px solid #e6e6e6;
    word-wrap: break-word;
    padding: 10px;
    .adv-msg{
      font-size: 2.7vh;
      width: 100%;
      color: #424242;
      word-wrap: break-word;
      line-height: 30px;
    }
  }
}

.tt-line {
  margin-top: 10px;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  border-left: 6px solid #ee0a24;
  padding: 5px;
  background: #fff;
  font{
    color: grey;
    font-weight: 500;
    letter-spacing: 1px;
    font-size: 2.8vh;
    margin-left: 10px;
  }
}

.bottom {
  position: relative;
  margin-bottom: 50px;
}
</style>
