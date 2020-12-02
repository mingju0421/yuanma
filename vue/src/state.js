/** 数据初始化 */

import { observe } from './observe/index'
export function initState (vm) {
  const options = vm.$options
  // vue 的数据来源 属性 方法 数据 计算属性 watch
  if (options.props) {
    initProps(vm)
  }
  if (options.methods) {
    initMethod(vm)
  }
  if (options.data) {
    initData(vm)
  }
  if (options.computed) {
    initComputed(vm)
  }
  if (options.watch) {
    initWatch(vm)
  }
}

function initProps (vm) { }
function initMethod (vm) { }
function initData (vm) {
  // 数据的初始化工作
  // 用户传递的 data
  let data = vm.$options.data
  data = vm._data = typeof data === 'function' ? data.call(vm) : data
  // 对象劫持, 用户改变数据, 获得通知
  // MVVM 模式, 数据变化驱动视图变化
  // Object.defineProperty() 给属性增加 get 方法和 set 方法
  observe(data)  // 响应式原理
}
function initComputed (vm) { }
function initWatch (vm) { }