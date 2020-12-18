/* eslint-disable no-unused-vars */
interface anyObject {
  [key: string]: any
}

interface ObjectFilterFunc {
  (
    data: anyObject,
    fn: (value: unknown, key?: number | string, data?: anyObject) => unknown,
  ): anyObject
}

/**
 * Filter for Object
 * @param {object} data
 * @param {function} fn (value: unknown, key?: number | string, data?: anyObject) => unknown
 */
const objectFilter: ObjectFilterFunc = function (data, fn) {
  const result = {}

  Object.keys(data).forEach(key => {
    if (fn(data[key], key, data)) {
      result[key] = data[key]
    }
  })

  return result
}

export default objectFilter
