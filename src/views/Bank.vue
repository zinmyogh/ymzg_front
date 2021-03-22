<template>
  <div class="bank">
    <div class="title">
      开通央行数字人民币钱包
    </div>
    <br>
    <div class="text">
      尊敬的用户！该功能暂未开放！
    </div>
    <br>
    <van-button plain hairline type="danger" @click="goHome">返回首页</van-button>
  </div>
</template>

<script>
  export default {
    methods: {
      goHome() {
        this.$router.push('/home')
      }
    }
  }
</script>

<style lang="scss" scoped>
.bank {
  width: 100%;
  height: 90vh;
  margin-top: 46px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  background: #f5f5f5;
}
.title {
  color: #212121;
  font-size: 2.8vh;
  font-weight: 700;
}
.text {
  color: grey;
  font-size: 2.5vh;
}
</style>
