function 生成链表(arr) {
    const 节点 = (值, 下一个) => Object({ val: 值, next: 下一个 || null })
    let 临时变量 = null
    while (arr.length) 临时变量 = 节点(arr.pop(), 临时变量)
    return 临时变量
}