class EventEmitter {
    constructor() {
        // 初始值为空对象
        this.listeners = Object.create(null)
    }
    // 注册事件
    on = (event, listener) => {
        // this.bindEvent(event, listener, false)
        if (!event || !listener) {
            return
        }
        if (this.listeners[event]) {
            // 如果有就放一个新的
            this.listeners[event].push(listener)
        } else {
            // 如果没有就创建一个数组
            this.listeners[event] = [listener]
        }
    }
    // 只订阅一次
    once = (event, listener) => {
        // this.bindEvent(event, listener, true)
        function one() {
            // 在one函数运行原来的函数, 只有将one清空
            listener.apply(this, arguments)
            // 先绑定 执行后在删除
            this.off(event)
        }
        this.on(event, one)
        // 此时emit会触发执行此函数, 会给这个函数传递rest参数
    }
    // 发布事件
    emit = (event, ...args) => {
        if (!this.hasBind(event)) {
            console.warn(`this event: ${event} don't has bind litener.`)
            return
        }
        this.listeners[event].forEach(listener => listener.call(this, ...args));
    }
    // 取消订阅
    off = (event, listener) => {
        if (!this.hasBind(event)) {
            console.warn(`this event: ${event} don't exist.`)
            return
        }
        // remove specific listener
        this.listeners[event] = this.listeners[event].filter(item => item != listener)
    }
    hasBind = event => {
        return this.listeners[event]?.length
    }
}

// 测试
const baseEvent = new EventEmitter()
function cb(value) {
    console.log(`heelo ${value}`)
}
baseEvent.once('click', cb)
baseEvent.emit('click', '2020')
console.log(baseEvent.listeners)