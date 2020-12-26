import currency from 'currency.js'

/**
 * Number 10000 -> 10,000
 *
 * @param {number} num
 * @param {number} precision
 */
const amount = function (num: number, precision?: number): string {
  return currency(num ?? 0, { symbol: '', precision: precision ?? 0 }).format()
}

export default amount
