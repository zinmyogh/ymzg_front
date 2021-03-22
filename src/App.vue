<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import { getAppImage } from '@/api/home'
export default {
  created() {
    // this.getAppImage()
    this.$router.push('/about')
  },
  // created() {
  //   // this.$router.push('/login')
  //   if (localStorage.getItem('_login_')) {
  //     this.login()
  //   } else {
  //     this.$router.push('/login')
  //   }
  // },
  methods: {
    getAppImage() {
      getAppImage().then(resp => {
        // console.log(resp, 'woietoiwaejoiajewtoghaotgaotgoawehit')
      })
    }
    // login() {
    //   const reqt = JSON.parse(localStorage.getItem('_login_'))
    //   this.$store.dispatch('user/login', reqt)
    //     .then((res) => {
    //       console.log('res login ', res)
    //       if (res.result === 'ok') {
    //         // Toast({
    //         //   message: '登录成功',
    //         //   position: 'top'
    //         // })
    //         // this.loginState = true
    //         // localStorage.setItem('_login_', JSON.stringify(reqt))
    //         this.$router.push('/')
    //       } else {
    //         // Toast({
    //         //   message: '登录失败',
    //         //   position: 'top'
    //         // })
    //       }
    //     }).catch(err => {
    //       console.error(err)
    //     })
    // },
  }
}
</script>

<style>
*, html, body {
  margin: 0;
  padding: 0;
}
.van-pagination__item {
  color: #ee0a25 !important;
}
.van-pagination__item:active {
    color: #fff;
    background-color: none !important;
}
.van-pagination__item--active:hover {
  background: #ddd !important;
}
.van-pagination__item--active {
  background: #ddd !important;
}
.van-pagination__prev:hover {
  background: #ddd !important;
}
.van-pagination__next:hover {
  background: #ddd !important;
}
</style>
