export * as arr from './array'
export * as str from './string'
export * as obj from './object'

export const type = function (arg: any) {
  return Object.prototype.toString.call(arg).slice(8, -1).toLowerCase()
}
