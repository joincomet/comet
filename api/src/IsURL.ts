import { URL } from 'url'
import got from 'got'

export const isURL = url => {
  try {
    new URL(url)
    return true
  } catch (err) {
    return false
  }
}

export const isImageURL = async url => {
  if (!isURL(url)) return false
  const http = url.lastIndexOf('http')
  if (http != -1) url = url.substring(http)
  const pathname = new URL(url).pathname
  if (!pathname) return false
  try {
    const res = await got.head(url)
    if (!res) return false
    if (!(res.statusCode >= 200 && res.statusCode < 300)) return false
    const headers = res.headers
    if (!headers) return false
    const contentType = headers['content-type']
    if (!contentType) return false
    return contentType.search(/^image\//) != -1
  } catch (e) {
    return false
  }
}
