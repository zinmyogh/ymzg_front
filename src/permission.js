import router from './router'
import store from './store'
import $Global from '@/api/global'
// import { getAutoLogin } from '@/utils/auth'

const whiteList = ['/login', '/register', '/about', '/forgot'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  // // determine whether the user has logged in
  // const token = $Global.optioner.token
  // console.log(store.getters.token, store.getters.login)
  if (store.getters.token !== '' && store.getters.login) {
      next()
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login`)
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  // NProgress.done()
})
