<template>
  <div class="amount">
    <font>签到明细</font>
    <van-row type="flex">
      <van-col span="6" class="col-h">账号</van-col>
      <van-col span="6" class="col-h">日期</van-col>
      <van-col span="6" class="col-h">获得资产</van-col>
      <van-col span="6" class="col-h">盈利</van-col>
    </van-row>
    <van-row type="flex" v-for="i in 10" :key="i">
      <van-col span="6" :class="{'col-t':i%2==0,'col-t-off':i%2!=0}">span: 6</van-col>
      <van-col span="6" :class="{'col-t':i%2==0,'col-t-off':i%2!=0}">span: 6</van-col>
      <van-col span="6" :class="{'col-t':i%2==0,'col-t-off':i%2!=0}">span: 6</van-col>
      <van-col span="6" :class="{'col-t':i%2==0,'col-t-off':i%2!=0}">span: 6</van-col>
    </van-row>

    <van-pagination
      v-model="currentPage"
      :items-per-page="pageSize"
      :total-items="125"
      :show-page-size="3"
      force-ellipses
      @change="onPageChange"
      style="margin-top: 10px;"
    />

    <div class="bottom">&nbsp;</div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        pageSize: 10,
        currentPage: 1,
      }
    },
    methods: {
      onPageChange(val) {
        // console.log(val)
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
  }
  .col-t-off{
    background: #fff;
    // border: 1px solid rgba(255, 160, 160, 0.705);
    border: 1px solid #ee0a2573;
    font-size: 2.6vh;
    color: #212121ab;
    text-align: center;
    margin: 1px 0;
  }
}

.bottom {
  position: relative;
  margin-bottom: 50px;
}
</style>