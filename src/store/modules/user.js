import { login, register } from '@/api/user'
import { getToken, setToken, removeToken, setLogout } from '@/utils/auth'
import router from '@/router'
import $Global from '@/api/global'
import { Toast } from 'vant'

const state = {
  token: getToken(),
  name: '',
  login: false,
  info: {
    result: 'ok',
    level: 4,        
    Id: '',
    name: '',
    nickname: '',
    reference_name: '',  // 推荐人
    token: '',
    enable: '',
    phone: '',
    WX: '',
    YHK: ''
  },
  carouselImg: [{img: `${config.irl}6f64e08d9608f0545a784de4f4540a61.png`}, {img: `${config.irl}8aba2c1b1315a520ac93e3a905e6e2d1.png`}, {img: `${config.irl}50848da78231cb3dea1ee1d068a273cd.png`}],
  shareBg: `${config.irl}1bb5fdfae8f813021363e1fa27f51eda.png`,
  noticeImg: [
    {img: `${config.irl}a2e548fdb307b3c794502e4afb856d81.png`},
    {img: `${config.irl}6700a451dc796bce42a2a52b7b19c98d.png`},
    {img: `${config.irl}82c1e1ad8fe0acac4bcca104945f711c.png`},
    {img: `${config.irl}5d0123a070752d3fdb310f4e7ce8742c.png`}
  ],
  loginImg: `${config.irl}dabb043a96d82a2fc3a5012df2e4237d.png`
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_LOGIN: (state, val) => {
    state.login = val
  },
  setCarouselImg: (state, payload) => {
    state.carouselImg = payload
  },
  setShareBg: (state, payload) => {
    state.shareBg = payload
  },
  setNoticeImg: (state, payload) => {
    state.noticeImg = payload
  }
}

const actions = {
  // user login
  login({ commit }, sendStr) {
    // const { username, password } = sendStr
    return new Promise((resolve, reject) => {
      login(sendStr).then(response => {
        // console.log('login response ', response)
        // result:"ok",
        // level: 4  level级别: 3 钻石会员 4铂金会员 5黄金会员 6白银会员  terminal:登录终端   
        // Id:"",
        // name: "",
        // nickname:"",
        // reference_name:  //推荐人		
        // token:"",
        // enable:""
        
        if (response.data.router === 'LoginErr') {
          Toast(response.data.reason)
          reject()
        }
        let resp = response.data.JsonData
        if (resp.result !== 'ok') {
          Toast('登录失败')
          reject()
        }
        // console.log('resp ', resp)
        state.info.Id = resp.Id
        state.info.level = resp.level === 3
          ? '钻石会员'
          : resp.level === 4
            ? '铂金会员'
            : resp.level === 5
              ? '黄金会员'
              : resp.level === 6
                ? '白银会员'
                : '普通会员'
        state.info.name = resp.name
        state.info.phone = resp.name
        state.info.nickname = resp.nickname
        state.info.reference_name = resp.reference_name
        state.info.token = resp.token
        state.info.enable = resp.enable
        state.info.WX = resp.wxh
        // console.log(state.info, 'state.info')
        commit('SET_TOKEN', resp.token)
        commit('SET_LOGIN', true)
        resolve(resp)
      }).catch(error => {
        reject(error)
      })
    })
  },

  register({ commit }, sendStr) {
    return new Promise((resolve, reject) => {
      register(sendStr).then(response => {
        // console.log('register response ', response)
        // code: 101  // 101 注册成功,102帐号已存在 103 上级代理不存在 104注册失败 
        // level: 6   // 6白银会员
        // Id:"",
        // token:"",
        let resp = response.data
        if (resp.JsonData.code === 102) {
          Toast({
            position: 'top',
            message: '帐号已存在'
          })
          reject()
        } else if (resp.JsonData.code === 103) {
          Toast({
            position: 'top',
            message: '上级代理不存在'
          })
          reject()
        } else if (resp.JsonData.code === 104) {
          Toast({
            position: 'top',
            message: '注册失败'
          })
          reject()
        } else if (resp.JsonData.code === 101) {
          Toast({
            position: 'top',
            message: '注册成功'
          })
          resolve(resp)
        }
        // resolve(resp)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      // setLogout()
      // // logout(state.token).then(() => {
      // commit('SET_TOKEN', '')
      // commit('SET_ROLES', [])
      // removeToken()
      // resetRouter()

      // // reset visited views and cached views
      // // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
      // dispatch('tagsView/delAllViews', null, { root: true })

      resolve()
      // }).catch(error => {
      //   reject(error)
      // })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      removeToken()
      resolve()
    })
  }
  
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
