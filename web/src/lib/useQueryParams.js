import { useLocation } from 'react-router-dom'

export function useQueryParams() {
  const params = new URLSearchParams(useLocation().search)
  const obj = {}

  // iterate over all keys
  for (const key of params.keys()) {
    if (params.getAll(key).length > 1) {
      obj[key] = params.getAll(key)
    } else {
      obj[key] = params.get(key)
    }
  }

  return obj
}
