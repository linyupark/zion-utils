interface ExtremeNumsParams {
  entries: number[]
  direction?: 'max' | 'min'
  number?: number
}

/**
 * Return max or min numbers in array
 * @param params {
      entries: number[]
      direction?: 'max' | 'min'
      number?: number
    }
 */
export default function (params: ExtremeNumsParams): number[] {
  const { entries, direction, number } = params

  return [...entries]
    .sort((a, b) => ((direction ?? 'max') === 'max' ? b - a : a - b))
    .slice(0, number ?? 1)
}
