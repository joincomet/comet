import got from 'got'
import { Metadata } from '@/metascraper/Metadata'
import { uploadImage } from '@/S3Storage'
import fetch from 'node-fetch'
import fileType from 'file-type'
import { isUrl } from '@/IsUrl'
import { Readable } from 'stream'

const metascraper = require('metascraper')([
  require('metascraper-author')(),
  require('metascraper-date')(),
  require('metascraper-description')(),
  require('metascraper-image')(),
  require('metascraper-logo')(),
  require('metascraper-clearbit')(),
  require('metascraper-publisher')(),
  require('metascraper-title')(),
  require('metascraper-url')(),
  require('./metascraperTwitterCard')()
])

const timeout = 5000

export const scrapeMetadata = async (targetUrl: string): Promise<Metadata> => {
  if (!isUrl(targetUrl)) return null

  let res
  try {
    res = await got(targetUrl, { timeout })
  } catch {
    return null
  }

  const { body: html, url } = res
  if (!isUrl(url)) return null

  let meta
  try {
    meta = (await metascraper({ html, url })) as Metadata
  } catch {
    return null
  }

  // Strip HTML tags
  if (meta.description)
    meta.description = meta.description.replace(/(<([^>]+)>)/gi, '')

  const { image, logo } = meta

  const resize = {
    width: 128,
    height: 128
  }

  if (image) {
    try {
      const ext = image.substr(image.lastIndexOf('.') + 1)
      meta.image = await uploadImage(got.stream(image), `image/${ext}`, resize)
    } catch {
      delete meta.image
    }
  }

  if (logo) {
    try {
      const ext = logo.substr(logo.lastIndexOf('.') + 1)
      meta.logo = await uploadImage(got.stream(logo), `image/${ext}`, resize)
    } catch {
      delete meta.logo
    }
  }

  return meta
}
