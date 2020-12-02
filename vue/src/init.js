import { initState } from './state'
export function initMixin (Vue) {
  // 进行 Vue 的初始化操作
  Vue.prototype._init = function (option) {
    // 数据的劫持
    const vm = this
    // vue 中使用 this.$options 指代的就是用户传递的属性
    vm.$options = option

    // 初始化状态
    initState(vm)  // 分割代码
  }
}