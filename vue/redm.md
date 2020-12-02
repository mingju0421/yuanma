# rollup 搭建开发环境
安装 rollup
```
yarn add -D rollup @babel/core @babel/preset-env rollup-plugin-babel rollup-plugin-serve cross-env
```
- rollup 打包工具
- @babel/core 用 babel 核心模块
- @babel/preset-env babel 将高级语法转成低级语法
- rollup-plugin-babel 桥梁
- rollup-plugin-serve 实现静态服务
- cross-env 设置环境变量