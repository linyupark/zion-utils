/* eslint-disable no-unused-vars */
interface anyObject {
  [key: string]: any
}

interface ObjectMapFunc {
  (
    data: anyObject,
    fn: (value: unknown, key?: number | string, data?: anyObject) => unknown,
  ): anyObject
}

/**
 * Map for Object
 * @param {object} data
 * @param {function} fn (value: unknown, key?: number | string, data?: anyObject) => unknown
 */
const objectMap: ObjectMapFunc = function (data, fn) {
  const result = {}

  Object.keys(data).forEach(key => {
    result[key] = fn(data[key], key, data)
  })

  return result
}

export default objectMap
