/**
 * Parse string as application/x-www-form-urlencoded representation.
 *
 * @class qs
 * @function parse
 * @param string {String} application/x-www-form-urlencoded representation
 * @returns {Object} plain key-value pair object
 * @example
 * var qs = require("qs-lite");
 *
 * var obj = qs.parse("foo=bar&hoge=pomu"); // => { "foo": "bar", "hoge": "pomu" }
 */
function parse(string) {
  const obj = {}

  if (string) string.replace(/\+/g, ' ').split(/[&;]/).forEach(it)
  return obj

  function it(pair) {
    const len = pair.length

    if (!len) return
    let pos = pair.indexOf('=')

    if (pos < 0) pos = len
    const key = decodeURIComponent(pair.substr(0, pos))
    const val = decodeURIComponent(pair.substr(pos + 1))

    // array
    const arrReg = /\[\d+\]/

    if (arrReg.test(key)) {
      const arrKey = key.replace(arrReg, '')

      if (!obj[arrKey]) {
        obj[arrKey] = []
      }
      obj[arrKey].push(val)
      return
    }

    obj[key] = val
  }
}

/**
 * Stringify object as application/x-www-form-urlencoded representation.
 *
 * @class qs
 * @function stringify
 * @param obj {Object} plain key-value pair object
 * @returns {string} application/x-www-form-urlencoded representation.
 * @example
 * var qs = require("qs-lite");
 *
 * var string = qs.stringify({foo: "bar", hoge: "pomu"}); // => "foo=bar&hoge=pomu"
 */
function stringify(obj) {
  const list: string[] = []

  if (typeof obj === 'object' && obj !== null) Object.keys(obj).map(it)
  return list.join('&')

  function it(key) {
    const val = obj[key]

    if (typeof val === 'undefined') return
    if (val === null) return
    // if (val === "") return;
    if (val instanceof Function) return
    if (Array.isArray(val)) {
      return val.map((v, i) => {
        list.push(
          encodeURIComponent(`${key}[${i}]`) + '=' + encodeURIComponent(v),
        )
      })
    }
    const pair = encodeURIComponent(key) + '=' + encodeURIComponent(val)

    list.push(pair)
  }
}

export default {
  parse,
  stringify,
}
