import axios from 'axios'

export default {
  install: function (Vue) {
    Object.defineProperty(Vue.prototype, '$axios', { value: axios })
  }
}
