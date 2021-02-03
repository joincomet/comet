export function base36ToBigInt(value) {
  const radix = 36
  return [...value.toString()].reduce(
    (r, v) => r * BigInt(radix) + BigInt(parseInt(v, radix)),
    0n
  )
}
