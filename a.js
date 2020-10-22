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