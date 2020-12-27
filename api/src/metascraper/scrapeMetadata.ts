import got from 'got'
import { Metadata } from '@/metascraper/Metadata'
import { uploadImage } from '@/S3Storage'
import fetch from 'node-fetch'
import fileType from 'file-type'
import { isUrl } from '@/IsUrl'
import { Readable } from 'stream'

export const scrapeMetadata = async (targetUrl: string): Promise<Metadata> => {
  if (!isUrl(targetUrl)) return null

  let res
  try {
    res = await got(targetUrl, { timeout: 2000 })
  } catch {
    return null
  }

  const { body: html, url } = res
  if (!isUrl(url)) return null

  let meta
  try {
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
    meta = (await metascraper({ html, url })) as Metadata
  } catch {
    return null
  }

  // Strip HTML tags
  if (meta.description)
    meta.description = meta.description.replace(/(<([^>]+)>)/gi, '')

  if (meta.image) {
    try {
      const response = await fetch(meta.image, { timeout: 2000 })
      const buffer = await response.buffer()
      const type = await fileType.fromBuffer(buffer)
      let resize = { width: 256, height: 256 }
      if (meta.twitterCard === 'summary_large_image')
        resize = { width: 1280, height: 720 }
      meta.image = await uploadImage(Readable.from(buffer), type.mime, resize)
    } catch {
      delete meta.image
    }
  }

  if (meta.logo) {
    try {
      const response = await fetch(meta.logo, { timeout: 2000 })
      const buffer = await response.buffer()
      const type = await fileType.fromBuffer(buffer)
      meta.logo = await uploadImage(Readable.from(buffer), type.mime, {
        width: 256,
        height: 256
      })
    } catch {
      delete meta.logo
    }
  }

  return meta
}
