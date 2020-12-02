export const isObject = data => typeof data == 'object' && data

export function def (data, key, value) {
  Object.defineProperty(data, key, {
    enumerable: false, // 不可枚举
    configurable: false, // 不可配置
    value: value
  })
}