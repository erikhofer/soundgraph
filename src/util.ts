export function round(n: number, decimals: number) {
  const factor = Math.pow(10, decimals)
  return Math.round(n / factor) * factor
}

/**
 * Normal space ` ` is omited in JSX. Use this to actually output a space.
 */
export const PROTECTED_SPACE = '\u00A0'
