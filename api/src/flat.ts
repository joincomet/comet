export function flat(r: any, a: any) {
  const b = {} as any
  Object.keys(a).forEach(function (k) {
    if (k !== 'childComments') {
      b[k] = a[k]
    }
  })
  r.push(b)
  if (Array.isArray(a.childComments)) {
    b.childComments = a.childComments.map(function (a: any) {
      return a.id
    })
    return a.childComments.reduce(flat, r)
  }
  return r
}
