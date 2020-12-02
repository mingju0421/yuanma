(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Vue = factory());
}(this, (function () { 'use strict';

  const isObject = data => typeof data == 'object' && data;

  function def (data, key, value) {
    Object.defineProperty(data, key, {
      enumerable: false, // 不可枚举
      configurable: false, // 不可配置
      value: value
    });
  }

  // 需要重写数组的方法 7 个: push shift unshift pop reverse sort splice reverse 会导致原数组发生变化

  let oldArrayMethods = Array.prototype;
  // value.__proto__ = arrayMethods
  // arrayMethods.__proto__ = oldArrayMethods
  // 原型链查找
  const arrayMethods = Object.create(oldArrayMethods);
  const methods = ['push', 'shift', 'unshift', 'pop', 'sort', 'splice', 'reverse'];
  methods.forEach(method => {
    arrayMethods[method] = function (...args) {
      console.log('用户调用了', method);
      const result = oldArrayMethods[method].apply(this, args); // 调用原生数组方法
      // 添加的元素可能还是一个对象
      let inserted; // 当前用户插入的元素
      let ob = this.__ob__;
      switch ((method)) {
        case 'push':
        case 'unshift':
          inserted = args;
          break;
        case 'splice':  // 3个参数
          inserted = args.slice(2);
      }
      if (inserted) ob.observerArray(inserted);  // 将新增属性继续观测
      return result
    };
  });

  // 把 data 中的数据, 都使用 object.defineProperty 重新定义, 不兼容 ie8 及以下
  class Observer {
    constructor(value) {
      // vue 如果数据的层次过多, 需要递归去解析对象中的属性, 一次增加 set 和 get 方法
      console.log(value);
      // value.__ob__ = this // 给每一个监听过的对象都增加一个__ob__属性
      def(value, '__ob__', this);
      if (Array.isArray(value)) {
        // 如果是数组的话, 并不会对索引进行观测, 因为会导致性能问题
        // 前端开发中, 很少去操作索引
        // 如果数组里放的是对象, 在监控
        value.__proto__ = arrayMethods;
        this.observerArray(value);
      } else {
        this.walk(value); // 对对象进行观测
      }
    }
    observerArray (value) {
      for (let item of value) {
        observe(item);
      }
    }
    walk (data) {
      let keys = Object.keys(data);
      for (let key of keys) {
        let value = data[key];
        defineReactive(data, key, value); // 定义响应式数据
      }
    }
  }
  function defineReactive (data, key, value) {
    observe(value);
    Object.defineProperty(data, key, {
      get () { // 获取值的时候, 做一些操作
        return value
      },
      set (newValue) { // 设置值得时候, 做一些操作
        console.log('update');
        if (newValue === value) return
        observe(value);
        value = newValue;
      }
    });
  }
  function observe (data) {
    // 判断 data 是不是对象
    if (!isObject(data)) return
    return new Observer(data) // 用来观测数据
  }

  /** 数据初始化 */
  function initState (vm) {
    const options = vm.$options;
    // vue 的数据来源 属性 方法 数据 计算属性 watch
    if (options.props) ;
    if (options.methods) ;
    if (options.data) {
      initData(vm);
    }
    if (options.computed) ;
    if (options.watch) ;
  }
  function initData (vm) {
    // 数据的初始化工作
    // 用户传递的 data
    let data = vm.$options.data;
    data = vm._data = typeof data === 'function' ? data.call(vm) : data;
    // 对象劫持, 用户改变数据, 获得通知
    // MVVM 模式, 数据变化驱动视图变化
    // Object.defineProperty() 给属性增加 get 方法和 set 方法
    observe(data);  // 响应式原理
  }

  function initMixin (Vue) {
    // 进行 Vue 的初始化操作
    Vue.prototype._init = function (option) {
      // 数据的劫持
      const vm = this;
      // vue 中使用 this.$options 指代的就是用户传递的属性
      vm.$options = option;

      // 初始化状态
      initState(vm);  // 分割代码
    };
  }

  // vue 的核心代码, 只是 vue 的声明

  function Vue (option) {
    this._init(option);
  }
  // 通过引入文件的方式, 给 vue 原型上添加方法
  initMixin(Vue);

  return Vue;

})));
//# sourceMappingURL=vue.js.map
