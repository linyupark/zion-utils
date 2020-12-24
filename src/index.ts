export * as arr from './array'
export * as str from './string'
export * as obj from './object'
export * as trans from './trans'
export * as file from './file'
export * as hooks from './hooks'
export { default as emitter } from 'mitt'

export const type = function (arg: any) {
  return Object.prototype.toString.call(arg).slice(8, -1).toLowerCase()
}
