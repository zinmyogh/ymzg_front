<template>
  <div class="me">
    <!-- <div class="info">
      <img src="../assets/images/info.jpg" alt="">
    </div> -->

    <div>
      <div class="me-title">
        <span>我的管理</span>
      </div>
      <div>
        <van-cell-group>
          <van-cell title="账号管理" is-link to="account" icon="user-circle-o" />
          <van-cell title="资金明细" is-link to="amount" icon="notes-o" />
          <van-cell title="资产明细" is-link to="money" icon="chart-trending-o" />
          <!-- <van-cell title="签到明细" is-link to="check" icon="flag-o" /> -->
          <van-cell title="团队管理" is-link to="relation" icon="cluster-o" />
          <van-cell title="提现管理" is-link to="cash" icon="cash-back-record" />
        </van-cell-group>
      </div>
    </div>

    <div class="bottom">&nbsp;</div>
  </div>
</template>

<script>
  export default {
    
  }
</script>

<style lang="scss" scoped>
.me {
  // margin-top: 46px;
  background: #f7f8fa;
  .info{
    width: 100%;
    height: 200px;
    // background: #ee0a25da;
    display: flex;
    flex-direction: column;
    position: relative;
    // .my{
    //   display: flex;
    //   flex-direction: column;
    //   margin: 10px 0 10px 10px;
    //   color: #f5f5f5;
    //   span{
    //     line-height: 30px;
    //   }
    // }
    // .data{
    //   bottom: 0;
    //   .data-name {
    //     font-size: 2.3vh;
    //     margin-top: 5px;
    //     color: grey;
    //   }
    //   .data-data {
    //     font-size: 2vh;
    //     margin-top: 5px;
    //   }
    // }
    img{
      width: 100%;
      height: 200px;
    }
  }
}
.me-title {
  color: rgba(69, 90, 100);
  line-height: 40px;
  span{
    line-height: 40px;
    font-size: 2.3vh;
    margin-left: 15px;
    border-left: 3px solid red;
    padding-left: 10px;
  }
}

.bottom {
  position: relative;
  margin-bottom: 50px;
}
</style>