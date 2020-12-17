interface RepeatTimesNumParams {
  entries: number[]
  number?: number
}

/**
 * Return how many times the number repeat in array
 * @param params {
      entries: number[]
      number?: number
    }
 */
export default function (params: RepeatTimesNumParams): number {
  const { entries, number } = params

  return entries.reduce((a, v) => (v === number ? a + 1 : a), 0)
}
