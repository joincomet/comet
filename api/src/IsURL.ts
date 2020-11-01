import { URL } from 'url'

export const isURL = (url: string | null | undefined) => {
  if (!url) return false
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

/*export const isImageContentType = (contentType: string | null | undefined) => {
  if (!contentType) return false
  const ext = contentType.replace('image/', '')
  return ext === 'jpeg' || ext === 'jpg' || ext === 'png' || ext === 'webp'
}*/

/*
export const isImageURL = async url => {
  if (!isURL(url)) return false
  const http = url.lastIndexOf('http')
  if (http != -1) url = url.substring(http)
  try {
    const pathname = new URL(url).pathname
    if (!pathname) return false
    const res = await got.head(url, { timeout: 5000 })
    if (!res) return false
    if (!(res.statusCode >= 200 && res.statusCode < 300)) return false
    const headers = res.headers
    if (!headers) return false
    const contentType = headers['content-type']
    if (!contentType) return false
    return contentType.search(/^image\//) != -1
  } catch {
    return false
  }
}
*/
