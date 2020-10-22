

# 健壮性 => 当代码出现问题的时候, 减少 BUG 的影响和加快定位 BUG 的速度
1. BUG 不至于让整个程序崩溃
2. BUG 可以快速定位

## 参数层面
1. 直接的简单参数
```javascript
function add(a, b) {
    return a + b
}
add(1, 2)  // 3
add(2)  // NaN
```
漏传参数, 并不会报错

```javascript
function add(a, b) {
    if(typeof a === 'number' && typeof b === 'number') {
        return a + b
    }else {
        throw new Error('a 或 b 不是数值')
    }
}
```

2. 配置参数 - 怎么确保必传的都传了 - 选项合并
```javascript
new vue({
    el: 'app',
})

function vue(config) {
    var _default = {
        el: document,
        template: '<div></div>'
    }
    // 如果外部没有传值, 就用默认的
    for(var item in config) {
        _default[item] = config[item] || _default[item]
    }
}
```

3. 参数是某个类的实例化对象

```javascript
function Class1() {}
function a(obj) {
    if(obj instanceof Class1) {
        ...
    }else {
        return new Error('类型错误')
    }
}
```

## js 特有的健壮性问题 - 区分类和方法
```javascript
function F1() {
    if(this instanceof F1) {
        this.a = 123
    }else {
        return new F1()
    }
}
F1()
```

## 易错代码
常见网络操作和文件操作

```javascript
try{
    // 易错代码
}catch(err) {

}

var a = {
    b:[{c: 23}]
}
a.b[0].c // 如果 a 不是对象, 就会报错
```

## 变量权限
```javascript
this.$router
this.$router = {} // 无效

// 怎么控制权限
// vue 做法
let _router = {}
Object.defineProperty(this, '$router', {
    // 只有 get 方法, 没有 set, 没办法设置
    get() {
        return _router
    }
})

// 要么限制他的读取

// 权限标签 - 对象的属性
// writable - 是否可被重写
// enmuerable - 是否可被枚举
// configurable - 是否可被遍历
```

# 可读性
## 语义化
先想想这个变量的作用, 然后用中文描述这个变量的作用, 把你的中文用翻译软件翻译成英文

## 命名规范
1. 常量 - 全大写
```javascript
const PIT = 3.14
```

2. 类 - 首字母大写, 驼峰写法

3. 一般变量和方法, 小驼峰写法

4. 零食变量 - 下划线开头
```javascript
function f1() {
    let _a = null
}
```

## 结构清晰
JavaScript 结构不清晰
- 回调
- if-else

## 可复用性
1. Dry 原则

2. 逻辑复用, 提取代码

3. 创建公用模板

## 可扩展性 - 解耦
1. 模块分明
- 六大设计原则
- 划分成模块, 保证模块职责单一  
- 模块 + 模块之间的交流
2. 耦合度低
- 彼此知道的非常少
- 彼此更改不会互相影响
3. 合适的扩张技巧

# 如何去设计功能
![如何去设计功能](https://tva1.sinaimg.cn/large/007S8ZIlly1gjwshtwnbxj30b5061gmm.jpg)