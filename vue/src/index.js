// vue 的核心代码, 只是 vue 的声明

import { initMixin } from './init'

function Vue (option) {
  this._init(option)
}
// 通过引入文件的方式, 给 vue 原型上添加方法
initMixin(Vue)
export default Vue
