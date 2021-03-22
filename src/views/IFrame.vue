<template>
  <div class="iframe">
    <iframe class="i_body" :src="link" width="100%" height="100%" frameborder="0" scrolling="auto"></iframe>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        link: 'https://baidu.com'
      }
    },
    created() {
      // console.log(this.$route, 'ccccccccccc')
      this.link = this.$route.params.link
    }
  }
</script>

<style lang="scss" scoped>
.iframe {
  width: 100%;
  height: calc(100vh - 96px);
  margin-top: 46px;
  .i_body{
    // margin-bottom: 50px;
    z-index: -10;
  }
}
</style>