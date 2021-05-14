<template>
  <div class="qr">
    <!--  :style="{background:`url(${downloadImg(qrbgimg)})`}" , backgroundRepeat: 'no-repeat' backgroundSize: '100% 100%'-->
    <img class="bg" :src="shareBg" alt="">
    <div style="padding: 15px 0;">
    </div>
    <div ref="qrDom" class="dcom">
      <div style="padding: 0 0 30px 0;">
      </div>
      <div class="qrbox">
        <div class="qrcode" id="qrcode" ref="qrcode"></div>
      </div>
      <div class="share">
        <font size="3" style="font-weight: bold;">推荐码 ：<span class="id_">{{ userInfo.Id }}</span></font>
      </div>
    </div>
  </div>
</template>

<script>
import QRCode from "qrcodejs2"
import html2canvas from "html2canvas"
import { getImage } from '@/api/home'
import { mapState } from 'vuex'
import defaultSetting from '@/settings'
export default {
  data() {
    return {
      qrLink: "https://www.shophh888.com",
      imgUrl: "",
      qrbgimg: ''
    }
  },
  computed: {
    ...mapState({ userInfo: state => state.user.info, shareBg: state => state.user.shareBg })
  },
  created() {
    // this.getQrImage()
    this.creatQrCode()
  },
  methods: {
    // getQrImage() {
    //   const reqt = {
    //     address: 4
    //   }
    //   getImage(reqt).then(resp => {
    //     // console.log(resp, 'getImage.... ')
    //     let res = resp.data.JsonData
    //     if (res.result === 'ok') {
    //       // this.qrbgimg = res.imgname[0]
    //       this.$store.commit('user/setShareBg', res.imgname[0])
    //     }
    //   }).catch(e => {
    //     console.error(e)
    //   })
    // },
    //生成二维码
    creatQrCode() {
      this.$nextTick(() => {
        document.getElementById("qrcode").innerHTML = ""
        var canvas = this.$refs.qrcode

        var qrcode = new QRCode(canvas, {
          text: this.qrLink, // 需要转换为二维码的内容
          width: 100,
          height: 100,
          colorDark: "#000",
          colorLight: "#fff",
          correctLevel: QRCode.CorrectLevel.H,
        })
        qrcode.clear() //清除二维码
        qrcode.makeCode(this.qrLink) //生成另一个新的二维码
      })
    },
    /***
     * 复制链接地址
     * 提示还需要改一下********
     */
    handleCopy(row) {
      this.copyData = row
      this.copy(this.copyData)
    },
    copy(data) {
      let url = data
      let oInput = document.createElement("input")
      oInput.value = url
      document.body.appendChild(oInput)
      oInput.select() // 选择对象;
      document.execCommand("Copy") // 执行浏览器复制命令
      this.$message.success( "复制链接成功")
      oInput.remove()
    },
    /**
     * 将页面指定节点内容转为图片
     * 1.拿到想要转换为图片的内容节点DOM；
     * 2.转换，拿到转换后的canvas
     * 3.转换为图片
     */
    clickGeneratePicture() {
      //生成图片
      html2canvas(this.$refs.qrDom).then((canvas) => {
        // 转成图片，生成图片地址
        let dataURL = canvas.toDataURL("image/png") //可将 canvas 转为 base64 格式
        this.imgUrl = dataURL
        if (this.imgUrl !== "") {
          var alink = document.createElement("a")
          alink.href = this.imgUrl
          alink.download = "我的二维码"; //图片名
          alink.click()
        }
        this.imgUrl = ""
      })
    },
    //返回首页
    goHome() {
      this.$router.go(-1)
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
  },
};
</script>

<style lang="scss" scoped>
.qr {
  position: relative;
  text-align: center;
  width: 100%;
  height: 100vh;
  // background: url(img) no-repeat 100%;
  // background: url(../../assets/images/share.jpg) no-repeat 100%;
  // background-size: 100% 100%;
  // background-repeat: no-repeat;
  // background-size: cover;
  .bg{
    width: 100%;
    height:100%;
    background-size: cover;
    background-repeat: no-repeat;
  }
  .dcom {
    position: absolute;
    bottom: 70px;
    left: 30px;
    display: flex;
    flex-direction: row;
  }
  .qrbox {
    min-height: 104px;
    width: 104px;
    background-color: #fff;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .qrbox:hover {
    -webkit-transform: translateY(-3px);
    -ms-transform: translateY(-3px);
    transform: translateY(-3px);
    -webkit-box-shadow: 0 0 6px #999;
    box-shadow: 0 0 6px #999;
    -webkit-transition: all 0.5s ease-out;
    transition: all 0.5s ease-out;
  }
  .share {
    min-width: 120px;
    position: absolute;
    color: rgba(37, 0, 0, 0.8);
    // border-radius: 3px;
    line-height: 30px;
    background: #fff;
    left: 120px;
    bottom: 0;
    padding: 5px 10px;
    .id_ {
      color: #ff1d1d;
      font-size: 18px;
      font-weight: bold;
    }
  }
}

</style>
