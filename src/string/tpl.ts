/**
 * tpl('hello, ${1}!!', 'Tom') => hello, Tom!!
 *
 * @param {string} str
 */
const tpl = (str: string, ...re: any[]) => {
  const reg = /\$\{(\d)\}/g

  if (re.length > 0 && re.length === str.match(reg).length) {
    let newStr = ''

    str.match(reg).forEach((k, i) => (newStr = str.replace(k, re[i])))
    return newStr
  }
  return str
}

export default tpl
