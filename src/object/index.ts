export { default as filter } from './filter'
export { default as map } from './map'

export const type = function (arg: any) {
  return Object.prototype.toString.call(arg).slice(8, -1).toLowerCase()
}
