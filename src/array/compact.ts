/*
 * compact
 * @param {Array} array - A list of elements to compact
 * @return {Array} Returns a filtered values
 */
export default function compact(array) {
  return array.filter(Boolean)
}
