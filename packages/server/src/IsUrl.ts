import { URL } from 'url'

export const isUrl = (url: string | null | undefined) => {
  if (!url) return false
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}
