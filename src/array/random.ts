/**
 * Sorting an Array in Random Order
 * @param entries any[]
 */
export default function (entries: any[]) {
  return entries.sort(function () {
    return Math.random() - 0.5
  })
}
