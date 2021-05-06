const port = 4195
const id = '192.168.10.202'
module.exports = {
  title: 'WD',
  ip: id, //'103.113.8.141', // '192.168.10.202',  // 114.29.253.162 https test
  port: port,
  imgPort: '8013',
  imgUrl: "http://" + id + ":" + port + "/download?imgName=", // 记得换 http  === https
}
