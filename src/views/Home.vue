<template>
  <div class="home">
    <!-- <van-swipe :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <img :src="downloadImg(image)" class="swipe-image" height="200px" width="100%" />
      </van-swipe-item>
    </van-swipe> -->

    <van-grid>
      <van-grid-item @click="goBank">
        <img class="bank" src="../assets/images/zgyh.png" alt="" width="38px" height="38px">
        <span class="bank-name">中国银行</span>
      </van-grid-item>
      <van-grid-item @click="goBank">
        <img class="bank" src="../assets/images/zgjsyh.png" alt="" width="38px" height="38px">
        <span class="bank-name">中国建设银行</span>
      </van-grid-item>
      <van-grid-item @click="goBank">
        <img class="bank" src="../assets/images/gsyh.png" alt="" width="38px" height="38px">
        <span class="bank-name">工商银行</span>
      </van-grid-item>
      <van-grid-item @click="goBank">
        <img class="bank" src="../assets/images/zgnyyh.png" alt="" width="38px" height="38px">
        <span class="bank-name">中国农业银行</span>
      </van-grid-item>
    </van-grid>

    <div class="tt-line">
      <span></span>
      <font>答题获取奖金</font>
    </div>

    <div class="a-q">
      <van-panel class="panel-title" :title="topic.title" desc="题目"> <!---desc="题目"  status="Status"-->
        <div class="question">{{ topic.topic }}</div>
        <br>
        <div class="answer">
          <van-radio-group v-model="radio">
            <van-row>
              <van-col span="12">
                <van-radio name="1" checked-color="#ee0a24">{{ topic.a }}</van-radio>
                <br>
                <van-radio name="2" checked-color="#ee0a24">{{ topic.b }}</van-radio>
              </van-col>
              <van-col span="12">
                <van-radio name="3" checked-color="#ee0a24">{{ topic.c }}</van-radio>
                <br>
                <van-radio name="4" checked-color="#ee0a24">{{ topic.d }}</van-radio>
              </van-col>
            </van-row>
          </van-radio-group>
        </div>
        <br>
        <template #footer class="q-btn">
          <!-- <van-button size="small">Button</van-button>
          <van-button size="small" type="danger">Button</van-button> -->
          <div>
            <van-button size="small" type="danger" @click="submitAnswer">提交</van-button>
          </div>
        </template>
      </van-panel>
    </div>
<!-- 
    <div class="tt-line">
      <span></span>
      <font>签到获取奖金</font>
    </div> -->

    <!-- <div class="check">
      <div class="check-container">
        <van-steps :active="cd" active-icon="success" active-color="#ee0a24">
          <van-step>介绍</van-step>
          <van-step>签到</van-step>
          <van-step>推荐</van-step>
          <van-step>答题</van-step>
          <van-step>获得奖励</van-step>
        </van-steps>
        <br>
        <van-button icon="success" size="large" type="default" plain @click="signDay">立即签到</van-button>
      </div>
      <div>
      </div>
    </div> -->

    <div class="bottom">&nbsp;</div>
  </div>
</template>

<script>
import { getTopic, postAnswer, postSign, getFirstPageImage, getDownload, getImage } from '@/api/home'
import { mapGetters, mapState } from 'vuex'
import { setAnswerToday, removeAnswerToday, getAnswerToday } from '@/utils/auth'
import { Toast } from 'vant'
import $axios from 'axios'
export default {
   data() {
    return {
      images: [
        // 'http://192.168.11.202:4195/download',
        // 'https://images.pexels.com/photos/6168330/pexels-photo-6168330.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
        // 'https://images.pexels.com/photos/5661243/pexels-photo-5661243.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
        // 'https://images.pexels.com/photos/6625398/pexels-photo-6625398.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
      ],
      radio: '1',
      cd: 4,
      // topic: {
      //   Id: '',
      //   title: '',
      //   topic: '',
      //   a: '',
      //   b: '',
      //   c: '',
      //   d: ''
      // },
      showAnsBtn: true,
      isAnswer: false
    }
  },
  computed: {
    ...mapGetters(['token']),
    ...mapState({ userInfo: state => state.user.info, topic: state => state.user.topic })
  },
  created() {
    // if (!getAnswerToday()) {
    //   if (!this.isAnswer) {
    this.getTopicData()
    // this.getCarousel()
    //   }
    // }
  },
  methods: {
    // downloadImg(imgName) {
    //   // console.log('send imagname ', imgName)
    //   let srcImg =
    //     "http://" +
    //     '192.168.11.202' +
    //     ":" +
    //     4195 +
    //     "/download?imgName=" +
    //     imgName;
    //     // console.log('src images ', srcImg)
    //   return srcImg;
    // },
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
          // console.log('this.cimgCheck ... ', this.cimgCheck)
          // console.log(this.images, 'this.images')
        }
      }).catch(err => {
        console.error(err)
      })
    },
    // getCarousel() {
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
    getTopicData() {
      const reqt = {
        Id: this.userInfo.Id
      }
      getTopic(reqt).then(resp => {
        // Id:2               // 编号
        // title:””           // 标题
        // topic:"",          // 题目内容  
        // selectItem:’’      // 选项abcd, 格式 # 隔开选项
        this.$store.commit('user/setTopic', resp.data.JsonData)
        // this.topic.Id = resp.data.JsonData.Id
        // this.topic.title = resp.data.JsonData.title
        // this.topic.topic = resp.data.JsonData.topic
        // this.topic.a = resp.data.JsonData.selectItem.split('#')[0]
        // this.topic.b = resp.data.JsonData.selectItem.split('#')[1]
        // this.topic.c = resp.data.JsonData.selectItem.split('#')[2]
        // this.topic.d = resp.data.JsonData.selectItem.split('#')[3]
      }).catch(err => {
        console.error(err)
      })
    },
    submitAnswer() {
      if (getAnswerToday()) {
        return Toast('您当天已答题。')
      }
      let result = this.radio === '1' ? 'a' : this.radio === '2' ? 'b' : this.radio === '3' ? 'c' : this.radio === '4' ? 'd' : ''
      const sendStr = {
        userId: this.userInfo.Id,
        name: this.userInfo.name,
        Id: this.topic.Id,
        result: result
      }
      postAnswer(sendStr).then(resp => {
        // answerResult:”ok”    //  ok正确,  err 错误
        
        // this.isAnswer = true
        // console.log('anseererrrr...', resp)
        let res = resp.data.JsonData
        if (res.answerResult === 'err') {
          Toast('答案错误！')
          // this.showAnsBtn = false
        } else if (res.answerResult === 'ok') {
          Toast('恭喜老板，答对了')
          setAnswerToday()
          // console.log(getAnswerToday(), 'getAnswerToday ......')
          // this.showAnsBtn = false
        } else {
          Toast(resp.data.msg)
        }
      }).catch(err => {
        console.error(err)
      })
    },
    signDay() {
      const reqt = {
        name: this.userInfo.name
      }
      postSign(reqt).then(resp => {
        // console.log("postSign .... ", resp)
        let response = resp.data.JsonData
        if (response.result === 'ok') {
          Toast('签到成功')
        } else {
          Toast(resp.data.msg)
        }
      }).catch(err => {
        console.error(err)
      })
    },
    goBank() {
      this.$router.push('/bank')
    }
  },
}
</script>

<style>
.van-cell__title {
  word-wrap: break-word !important;
}
</style>

<style lang="scss" scoped>
.home {
  // margin-top: 46px;
  overflow-y: scroll;
  width: 100%;
  height: 100%;
  background: #f5f5f5;
}
.navbar {
    position: relative;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    align-items: center;
    height: 46px;
    line-height: 22px;
    text-align: center;
    background-color: #fff;
    -webkit-user-select: none;
    user-select: none;
    border: 1px solid #ebedf0;
    font-family: -apple-system,BlinkMacSystemFont,'Helvetica Neue',Helvetica,Segoe UI,Arial,Roboto,'PingFang SC',miui,'Hiragino Sans GB','Microsoft Yahei',sans-serif;
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
      color: #1989fa;
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
    font-size: 2.6vh;
    margin-left: 10px;
  }
}

.a-q {
  width: 100%;
  height: 100%;
  background: #f5f5f5;
  box-sizing: border-box;
  padding: 10px;
}
.panel-title {
  width: 100%;
  word-wrap: break-word;
}
.question {
  width: 100%;
  text-indent:2em;
  word-wrap: break-word;
  padding: 5px;
  color: grey;
  font-size: 2.5vh;
}
.q-btn{
  text-align: center;
}
.answer {
  padding-left: 10px;
}


.check {
  margin-bottom: 50px;
}
.check-container {
  padding: 10px;
}


.bottom {
  position: relative;
  margin-bottom: 50px;
}
</style>
