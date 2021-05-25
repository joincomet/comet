import got from 'got'
import isURL from 'validator/lib/isURL'
import UserAgent from 'user-agents'

const timeout = 5000

export async function isImageUrl(url: string): Promise<boolean> {
  if (!url) return false
  if (!isURL(url)) return false

  const userAgent = new UserAgent().toString()
  let res
  try {
    res = await got(url, {
      method: 'HEAD',
      timeout,
      headers: {
        'user-agent': userAgent
      }
    })
  } catch {
    return false
  }
  const { headers } = res
  const contentType = headers['content-type']
  return ['image/gif', 'image/jpeg', 'image/png', 'image/webp'].includes(
    contentType
  )
}
