interface PadParams {
  pad: string
  times?: number
  index?: number
}

/**
 * Add string to the beginning(0) or end(-1)
 * eg.
 * padString('123', { pad: '4' }) => "4123"
 * padString('123', { pad: '4', times: 2, index: -1}) => "12344"
 *
 * @param {string} str
 * @param {PadParams} params
 */
const padString = function (str: string, params: PadParams): string {
  const { pad } = params
  const strArr = Array.from(str)
  const strLen = strArr.length
  const times = params.times ?? 1
  const index = params.index ?? 0
  let padFn = 'padStart'

  if (index >= strLen || index === -1) {
    padFn = 'padEnd'
  }

  if (index > 0 && index < strLen) {
    // other position
    strArr.splice(index, 1, padString(strArr[index], { pad, times }))
    return strArr.join('')
  }

  return str[padFn](strLen + times, pad)
}

export default padString
