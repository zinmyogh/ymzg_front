const getters = {
  token: state => state.user.token,
  login: state => state.user.login
  // name: state => state.user.name,

  // // 添加代理、会员 ===== 是否成功状态
  // EDIT_MEMBER_OK: state => state.ht.edit_member_ok
}
export default getters
