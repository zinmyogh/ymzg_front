<template>
  <div class="account">
    
    <div class="acc">
      <font>我的信息</font>
      <van-cell-group>
        <van-field label="ID" :value="userInfo.Id" readonly />
        <!-- <van-field label="姓名" :value="userInfo.nickname" readonly /> -->
        <van-field v-model="nickname" :value="userInfo.nickname" center clearable label="姓名" placeholder="更改姓名">
          <template #button>
            <van-button size="small" type="primary" @click="changeNickName">确认修改</van-button>
          </template>
        </van-field>
        <van-field label="账号" :value="userInfo.name" readonly />
        <van-field v-model="password" center clearable label="密码" placeholder="更改密码">
          <template #button>
            <van-button size="small" type="primary" @click="changePassword">确认修改</van-button>
          </template>
        </van-field>
        <van-field label="手机号" :value="userInfo.phone" readonly />
        <!-- <van-field label="账号级别" :value="userInfo.level" readonly /> -->
        <van-field label="下级总数" :value="relations" readonly />
        <!-- <van-field label="微信号" :value="showWX" readonly />
        <van-field label="银行卡号" :value="showYHK" readonly />
        <van-cell title="推广海报" is-link to="qrcode" /> -->
      </van-cell-group>
    </div>
    <div class="acc">
      <font>我的资产</font>
      <van-cell-group>
        <!-- <van-field label="我的资产" :value="`￥ ${money.score || 0}`" readonly /> -->
        <van-field label="推荐资产" :value="`￥ ${money.referalScore || 0}`" readonly />
        <!-- <van-field label="答题资产" :value="`￥ ${money.answerScore || 0}`" readonly /> -->
        <van-field label="签到资产" :value="`￥ ${money.answerScore || 0}`" readonly />
      </van-cell-group>
    </div>
    <!-- <div class="acc">
      <font>完善个人信息</font>
      <van-collapse v-model="activeNames">
        <van-collapse-item title="立即完善" name="1">
          <van-cell-group>
            <van-field label="微信号" v-model="WX" placeholder="请输入" />
            <van-field label="银行卡号" v-model="YHK" placeholder="请输入" />
          </van-cell-group>
          <div class="update-social">
            <van-button type="danger" plain size="large" @click="updateInfo">更新</van-button>
          </div>
        </van-collapse-item>
      </van-collapse>
    </div> -->

    <div class="acc">
      <font>上级信息</font>
      <van-cell-group>
        <van-field label="Id" :value="shangji.Id" readonly />
        <van-field label="账号" :value="shangji.username" readonly />
        <van-field label="姓名" :value="shangji.nickname" readonly />
        <van-field label="手机号" :value="shangji.phone" readonly />
        <!-- <van-field label="微信号" :value="shangji.wxh" readonly /> -->
      </van-cell-group>
    </div>
    <div class="bottom">&nbsp;</div>
  </div>
</template>

<script>
import { getScoreData, editOwnInfo, getRelationData, getOwnInfo, getReferenceInfo } from '@/api/me'
import { editPassword, editNickName } from '@/api/user'
import { mapState } from 'vuex'
import { Tab, Toast } from 'vant'
import { getLOgin } from '@/utils/auth'
  export default {
    data() {
      return {
        activeNames: [],
        password: '',
        nickname: '',
        QQ: '',
        WX: '',
        YHK: '',
        money: {
          score: '',   
          referalScore: '',
          signScore: '',
          answerScore: ''
        },
        relations: '',
        showWX: '',
        showYHK: '',
        shangji: {}
      }
    },
    computed: {
      ...mapState({ userInfo: state => state.user.info })
    },
    created() {
      this.getScore()
      // this.getRelation()
      this.getOwn()
      this.getShangji()
      this.nickname = this.userInfo.nickname
      // console.log('userInfo', this.userInfo)
    },  
    methods: {
      goQR() {
        this.$router.push('/qrcode')
      },
      getShangji() {
        const reqt = {
          reference_name: this.userInfo.reference_name
        }
        getReferenceInfo(reqt).then(resp => {
          // console.log('reference ... ', resp)
          let res = resp.data.JsonData
          if (res.result === 'ok') {
            this.shangji = res.data
          }
        }).catch(e => {
          console.error(e)
        })
      },
      getOwn() {
        const reqt = {
          Id: this.userInfo.Id
        }
        // console.log('get own info ', reqt)
        getOwnInfo(reqt).then(resp => {
          // console.log('own info ', resp)
          let res = resp.data.JsonData
          if (res.result === 'ok') {
            this.money.score = res.data.score
            this.money.answerScore = res.data.answer_score
            this.money.signScore = res.data.sign_score
            this.money.referalScore = res.data.referal_score
            this.showWX = res.data.wxh
            this.showYHK = res.data.bankInfo
          }
        }).catch(err => {
          console.error(err)
        })
      },
      getScore() {
        const reqt = {
          name: this.userInfo.name
        }
        // console.log('reat ',reqt)
        getScoreData(reqt).then(resp => {
        //  score:"",          //  总资产
        //  referalScore:      //  推荐奖
        //  signScore:         //  签到得分
        //  answerScore:       //　回答得分
          // console.log('getScoredata ', resp)
          let res = resp.data.JsonData
          if (res.result === 'ok') {
            this.money.score = res.score
            this.money.answerScore = res.answerScore
            this.money.signScore = res.signScore
            this.money.referalScore = res.referalScore
          } else {
            Toast('网络错误')
          }
        }).catch(err => {
          console.error(err)
        })
      },
      changeNickName() {
        // console.log(this.userInfo , this.nickname)
        if (this.nickname === '') {
          Toast('请输入姓名')
          return
        }
        const reqt = {
          Id: this.userInfo.Id,
          nickname: this.nickname
        }
        // console.log('pass ', reqt)
        editNickName(reqt).then(resp => {
          // console.log('editnickname ... ', resp)
          let res = resp.data.JsonData
          if (res.result === 'ok') {
            Toast('修改成功')
            this.getMyInfo()
            this.nickname = ''
          } else {
            Toast('修改失败')
          }
        }).catch(err => {
          console.error(err)
        })
      },
      getMyInfo() {
        // const reqt = JSON.parse(localStorage.getItem('_login_'))
        const reqt = JSON.parse(getLOgin())
        this.$store.dispatch('user/login', reqt)
        .then((res) => {
          // console.log('res login ', res)
          if (res.result === 'ok') {
            this.nickname = this.userInfo.nickname
          } else {
          }
        }).catch(err => {
          console.error(err)
        })
      },
      changePassword() {
        if (this.password === '') {
          Toast('请输入密码')
          return
        }
        const reqt = {
          name: this.userInfo.name,
          pw: this.$md5(this.password) // pw加密并加盐后md5, 盐同注册
        }
        // console.log('pass ', reqt)
        editPassword(reqt).then(resp => {
          // console.log('editPassword ... ', resp)
          let res = resp.data.JsonData
          if (res.result === 'ok') {
            Toast(resp.data.msg)
            const lg = {
              name: this.userInfo.name,
              password: this.$md5(this.password),
              terminal: 'mobile'
            }
            this.password = ''
            // console.log('this.userInfo ... ', this.userInfo, lg)
            localStorage.setItem('_login_', JSON.stringify(lg))
          } else {
            Toast(resp.data.msg)
          }
        }).catch(err => {
          console.error(err)
        })
      },
      updateInfo() {
        const reqt = {
          name: this.userInfo.name,
          wxh: this.WX || '',
          bankInfo: this.YHK || ''
        }
        // console.log('edit own reqt ', reqt, this.userInfo)
        editOwnInfo(reqt).then(resp => {
          // console.log('editown ... ', resp)
          let res = resp.data.JsonData
          if (res.result === 'ok') {
            Toast(res.msg)
            this.WX = ''
            this.YHK = ''
          } else {
            Toast('上传出现错误')
          }
        }).catch(err => {
          console.error(err)
        })
      },
      getRelation() {
        const reqt = {
          Id: this.userInfo.Id
        }
        // console.log('get relations ', reqt)
        getRelationData(reqt).then(resp => {
          // console.log('relation s ', resp)
          this.relations = resp.data.JsonData.data.length
        }).catch(err => {
          console.error(err)
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
.account {
  margin-top: 46px;
  background: #f7f8fa;
  .acc{
    font{
      color: grey;
      margin-left: 10px;
      line-height: 30px;
      border-left: 3px solid red;
      padding-left: 5px;
    }
    .update-social{
      margin: 10px 20px;
      text-align: center;
    }
  }
}
.bottom {
  position: relative;
  margin-bottom: 50px;
}
</style>