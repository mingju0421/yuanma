# 起因
面试的时候多次遇到, 今天同事突然问道一个相关的面试题

```javascript
console.log('script start')
async function async1() {
    await async2()
    console.log('async1 end')
}
async function async2() {
    console.log('async2 end')
}

async1()

setTimeout(() => console.log('setTimeout'), 0)

new Promise(res => {
    console.log('Promise')
    res()
}).then(() => console.log('Promise1'))
    .then(() => console.log('Promise2'))

console.log('script end')
```

输出结果是: (浏览器与node执行的结果有些许区别)
```
script start
async2 end
Promise
script end
async1 end
Promise1
Promise2
setTimeout
```

运行过程:
```javascript
1. 输出 console.log('script start')
2. 执行setTimeout
    'setTimeout' 进入宏队列
3. 执行 async1()
    async1 => 执行 async2();
    输出 'async2 end'; 
    'async1 end' 进入微队列
4. 执行 new Promise() 输出 'Prominse';
    'promise1' 进入微队列;
    'promise2' 进入微队列;
5. 输出 'script end'
6. 依次执行微队列, 输出 'async1 end', 'promise1', 'promise2' 
7. 执行宏队列 输出 'setTimeout'
```