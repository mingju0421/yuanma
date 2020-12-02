// 把 data 中的数据, 都使用 object.defineProperty 重新定义, 不兼容 ie8 及以下
import { def, isObject } from '../util/index'
import { arrayMethods } from './array.js'
class Observer {
  constructor(value) {
    // vue 如果数据的层次过多, 需要递归去解析对象中的属性, 一次增加 set 和 get 方法
    console.log(value)
    // value.__ob__ = this // 给每一个监听过的对象都增加一个__ob__属性
    def(value, '__ob__', this)
    if (Array.isArray(value)) {
      // 如果是数组的话, 并不会对索引进行观测, 因为会导致性能问题
      // 前端开发中, 很少去操作索引
      // 如果数组里放的是对象, 在监控
      value.__proto__ = arrayMethods
      this.observerArray(value)
    } else {
      this.walk(value) // 对对象进行观测
    }
  }
  observerArray (value) {
    for (let item of value) {
      observe(item)
    }
  }
  walk (data) {
    let keys = Object.keys(data)
    for (let key of keys) {
      let value = data[key]
      defineReactive(data, key, value) // 定义响应式数据
    }
  }
}
function defineReactive (data, key, value) {
  observe(value)
  Object.defineProperty(data, key, {
    get () { // 获取值的时候, 做一些操作
      return value
    },
    set (newValue) { // 设置值得时候, 做一些操作
      console.log('update')
      if (newValue === value) return
      observe(value)
      value = newValue
    }
  })
}
export function observe (data) {
  // 判断 data 是不是对象
  if (!isObject(data)) return
  return new Observer(data) // 用来观测数据
}