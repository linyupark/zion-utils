/**
 * Get an array with elements that are included in two other arrays.
 * intersection([1, 2, 3], [4, 3, 2]); // [2, 3]
 */
export default function (a: any[], b: any[]) {
  const s = new Set(b)

  return a.filter(x => s.has(x))
}
