import got from 'got'
import { Metadata } from '@/metascraper/Metadata'
import { uploadImage } from '@/S3Storage'
import fetch from 'node-fetch'
import fileType from 'file-type'
import { isUrl } from '@/IsUrl'

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
      meta.image = await uploadImage(buffer, type.mime)
    } catch {
      delete meta.image
    }
  }

  if (meta.logo) {
    try {
      const response = await fetch(meta.logo, { timeout: 2000 })
      const buffer = await response.buffer()
      const type = await fileType.fromBuffer(buffer)
      meta.logo = await uploadImage(buffer, type.mime)
    } catch {
      delete meta.logo
    }
  }

  return meta
}
