/**
 * No duplicate array entries
 * @param entries any[]
 */
export default function (entries: any[]) {
  return Array.from(new Set(entries))
}
