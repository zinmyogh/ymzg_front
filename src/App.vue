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

/* .el-tree-node__expand-icon.is-leaf::before {
  display: none;
}
.el-tree-node__content>.el-tree-node__expand-icon{
  color: red !important;
}
.tree .el-tree-node {
  position: relative;
  padding-left: 15px;
}
.el-tree {
  height: 80vh;
  width: 100%;
  overflow-x: scroll;
}

.el-tree>.el-tree-node {
  display: inline-block;
  min-width: 100%;
}

.tree .el-tree-node__children {
  padding-left: 5px;
  overflow-x: scroll;
}

.tree .el-tree-node :last-child:before {
  height: 38px;
}

.tree .el-tree > .el-tree-node:before {
  border-left: none;
}

.tree-container .el-tree > .el-tree-node:after {
  border-top: none;
}

.tree .el-tree-node:before {
  content: "";
  left: -5px;
  position: absolute;
  right: auto;
  border-width: 1px;
}

.tree .el-tree-node:after {
  content: "";
  left: -5px;
  position: absolute;
  right: auto;
  border-width: 1px;
}

.tree .el-tree-node:before {
  border-left: 1px double #ee0a24;
  bottom: 0px;
  height: 100%;
  top: -26px;
  width: 1px;
}

.tree .el-tree-node:after {
  border-top: 1px dashed #ee0a24;
  height: 20px;
  top: 12px;
  width: 24px;
} */

</style>
