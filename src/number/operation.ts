import currency from 'currency.js'

type NumberOperation = '+' | '-' | '*' | '/'

/**
 * Number + - * /
 *
 * @param {number} x
 * @param {string} operation
 * @param {number} y
 */
const operation = function (
  x: number,
  operation: NumberOperation,
  y: number,
): number {
  return currency(x)[
    { '+': 'add', '-': 'subtract', '*': 'multiply', '/': 'divide' }[operation]
  ](y).value
}

export default operation
