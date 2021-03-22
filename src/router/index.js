import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
import store from 'vuex'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main,
    redirect: "/home",
    children: [
      {
        path: '/home',
        name: 'Home',
        component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue'),
        meta: {
          keepAlive: false // 需要被缓存
        }
      },
      {
        path: '/notice',
        name: 'Notice',
        component: () => import(/* webpackChunkName: "notice" */ '../views/Notice.vue'),
        meta: {
          keepAlive: false // 需要被缓存
        }
      },
      {
        path: '/me',
        name: 'Me',
        // redirect: '/setting',
        component: () => import(/* webpackChunkName: "me" */ '../views/Me.vue'),
        meta: {
          keepAlive: false // 需要被缓存
        }
      },
      {
        path: '/bank',
        name: 'Bank',
        component: () => import(/* webpackChunkName: "bank" */ '../views/Bank.vue'),
        meta: {
          keepAlive: false // 需要被缓存
        }
      },
      {
        path: '/account',
        name: 'Account',
        component: () => import(/* webpackChunkName: "Account" */ '../views/me/account.vue'),
        meta: {
          keepAlive: false // 需要被缓存
        }
      },
      {
        path: '/amount',
        name: 'Amount',
        component: () => import(/* webpackChunkName: "Amount" */ '../views/me/amount.vue'),
        meta: {
          keepAlive: false // 需要被缓存
        }
      },
      {
        path: '/money',
        name: 'Money',
        component: () => import(/* webpackChunkName: "Money" */ '../views/me/money.vue'),
        meta: {
          keepAlive: false // 需要被缓存
        }
      },
      {
        path: '/check',
        name: 'Check',
        component: () => import(/* webpackChunkName: "Check" */ '../views/me/check.vue'),
        meta: {
          keepAlive: false // 需要被缓存
        }
      },
      {
        path: '/relation',
        name: 'Relation',
        component: () => import(/* webpackChunkName: "Relation" */ '../views/me/relation.vue'),
        meta: {
          keepAlive: false // 需要被缓存
        }
      },
      {
        path: '/qrcode',
        name: 'Qrcode',
        component: () => import(/* webpackChunkName: "Qrcode" */ '../views/me/qrcode.vue'),
        meta: {
          keepAlive: true // 需要被缓存
        }
      },
      {
        path: '/cash',
        name: 'Cash',
        component: () => import(/* webpackChunkName: "Cash" */ '../views/me/cash.vue'),
        meta: {
          keepAlive: false // 需要被缓存
        }
      },
      {
        path: '/iframe',
        name: 'IFrame',
        component: () => import(/* webpackChunkName: "Cash" */ '../views/IFrame.vue'),
        meta: {
          keepAlive: false // 需要被缓存
        }
      },
    ]
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    meta: {
      keepAlive: false // 需要被缓存
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "Login" */ '../views/Login.vue'),
    meta: {
      keepAlive: false // 需要被缓存
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import(/* webpackChunkName: "Register" */ '../views/Register.vue'),
    meta: {
      keepAlive: false // 需要被缓存
    }
  },
  {
    path: '/forgot',
    name: 'Forgot',
    component: () => import(/* webpackChunkName: "Forgot" */ '../views/ForgotPassword.vue'),
    meta: {
      keepAlive: false // 需要被缓存
    }
  },
  // {
  //   path: '/setting',
  //   name: 'Setting',
  //   component: () => import(/* webpackChunkName: "Login" */ '../views/Setting.vue')
  // },

]

// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

const router = new VueRouter({
  routes
})

export default router
