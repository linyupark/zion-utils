/*
 * range
 * @param {Number} size
 * @return {Array} Returns a list of generated keys
 */
export default function range(size) {
  return [...Array(size).keys()]
}
