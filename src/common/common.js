export default {
  isEmptyObject (obj) {
    for (let key in obj) {
      return false
    }
    return true
  },
  getQueryString (name) {
    let url = 'https://redirect_uri?code=12345&state=STATE'
    let reg = new RegExp('(^|&\?)' + name + '=([^&]*)(&|$)', 'i')
    // let r = window.location.search.substr(1).match(reg)
    let r = url.substr(1).match(reg)
    if (r != null) {
      return unescape(r[2])
    }
    return null
  }
}
