<template>
  <div class="amount">
    <font>资金明细</font>
    <van-cell title="选择时间段" :value="date" @click="show = true" />
    <van-calendar v-model="show" @confirm="onConfirm" type="range" :min-date="minDate" :max-date="maxDate" />
    <van-row type="flex">
      <van-col span="6" class="col-h">用户ID</van-col>
      <van-col span="6" class="col-h">获得资金</van-col>
      <van-col span="12" class="col-h">日期</van-col>
      <!-- <van-col span="6" class="col-h">盈利</van-col> -->
    </van-row>
    <van-row type="flex" v-for="(i, index) in assetList" :key="index">
      <van-col span="6" :class="{'col-t':index%2==0,'col-t-off':index%2!=0}">{{ i.userId }}</van-col>
      <van-col span="6" :class="{'col-t':index%2==0,'col-t-off':index%2!=0}"> ￥{{ i.score }}</van-col>
      <van-col span="12" :class="{'col-t':index%2==0,'col-t-off':index%2!=0}">{{ formatD(i.stime) }}</van-col>
      <!-- <van-col span="6" :class="{'col-t':i%2==0,'col-t-off':i%2!=0}">{{  }}</van-col> -->
    </van-row>

    <van-pagination
      v-model="currentPage"
      :items-per-page="pageSize"
      :total-items="assetCount"
      :show-page-size="3"
      force-ellipses
      @change="onPageChange"
      style="margin-top: 10px;"
    />

    <div class="bottom">&nbsp;</div>
  </div>
</template>

<script>
import { getAsset } from '@/api/me'
import { mapState } from 'vuex'
import moment from 'moment'
  export default {
    data() {
      return {
        pageSize: 10,
        currentPage: 1,
        startTime: '',
        endTime: '',
        date: '',
        minDate: new Date(2020, 0, 1),
        maxDate: new Date(2030, 0, 31),
        show: false,
        assetList: [],
        assetCount: 0
      }
    },
    computed: {
      ...mapState({ userInfo: state => state.user.info })
    },
    created() {
      // this.getReferal()
      // console.log(moment('2021-03-04T15:59:59.000Z').format('YYYY-MM-DD HH:mm:ss'))
    },
    methods: {
      formatD(date) {
        return moment(date).format("YYYY-MM-DD hh:mm:ss")
      },
      getReferal() {
        
        const reqt = {
          Id: this.userInfo.Id,
          currentPage: this.currentPage,
          pageSize: this.pageSize,
          startTime: this.startTime,
          endTime: this.endTime
        }
        // console.log('reqt ', reqt)
        getAsset(reqt).then(resp => {
          // score:"",          // 推荐奖分数  
          // name:              // 推荐帐号
          // referal_name:	    // 推荐人
          
          // console.log('getAsset .... ', resp)
          this.assetList = resp.data.JsonData.data
          this.assetCount = resp.data.JsonData.itemCount
        }).catch(err => {
          console.error(err)
        })
      },
      onPageChange(val) {
        // console.log(val)
        this.currentPage = val
        this.getReferal()
      },
      onConfirm(date) {
        this.show = false;
        this.startTime = moment(date[0]).format("YYYY-MM-DD hh:mm:ss")
        this.endTime = moment(date[1]).format("YYYY-MM-DD hh:mm:ss")
        // this.date = this.formatDate(date);
        // console.log(date, 's ', this.startTime, 'e ', this.endTime)
        this.getReferal()
      }
    }
  }
</script>

<style lang="scss" scoped>
.amount{
  margin-top: 46px;
  background: #f7f8fa;
  font{
    color: grey;
    margin-left: 10px;
    line-height: 30px;
    border-left: 3px solid red;
    padding-left: 5px;
  }
  .col-h {
    background: #fff;
    border: 1px solid rgba(0, 0, 0, 0.8);
    font-size: 2.5vh;
    color: #000000;
    text-align: center;
    margin: 1px 0;
  }
  .col-t{
    background: #fff;
    border: 1px solid rgba(126, 126, 126, 0.705);
    font-size: 2.6vh;
    color: #212121ab;
    text-align: center;
    margin: 1px 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .col-t-off{
    background: #fff;
    // border: 1px solid rgba(255, 160, 160, 0.705);
    border: 1px solid #ee0a2573;
    font-size: 2.6vh;
    color: #212121ab;
    text-align: center;
    margin: 1px 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.bottom {
  position: relative;
  margin-bottom: 50px;
}
</style>