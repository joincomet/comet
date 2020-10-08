import { URL } from 'url'

export const isURL = s => {
  try {
    new URL(s)
    return true
  } catch (err) {
    return false
  }
}
