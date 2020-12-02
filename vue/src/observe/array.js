// 需要重写数组的方法 7 个: push shift unshift pop reverse sort splice reverse 会导致原数组发生变化

let oldArrayMethods = Array.prototype
// value.__proto__ = arrayMethods
// arrayMethods.__proto__ = oldArrayMethods
// 原型链查找
export const arrayMethods = Object.create(oldArrayMethods)
const methods = ['push', 'shift', 'unshift', 'pop', 'sort', 'splice', 'reverse']
methods.forEach(method => {
  arrayMethods[method] = function (...args) {
    console.log('用户调用了', method)
    const result = oldArrayMethods[method].apply(this, args) // 调用原生数组方法
    // 添加的元素可能还是一个对象
    let inserted // 当前用户插入的元素
    let ob = this.__ob__
    switch ((method)) {
      case 'push':
      case 'unshift':
        inserted = args
        break;
      case 'splice':  // 3个参数
        inserted = args.slice(2)
      default:
        break;
    }
    if (inserted) ob.observerArray(inserted)  // 将新增属性继续观测
    return result
  }
})