import got from 'got'
import { Metadata } from '@/metascraper/Metadata'
import { uploadImage } from '@/S3Storage'
import fetch from 'node-fetch'
import fileType from 'file-type'
import { v4 as uuidv4 } from 'uuid'
import { isURL } from '@/IsURL'

const metascraper = require('metascraper')([
  require('metascraper-author')(),
  require('metascraper-date')(),
  require('metascraper-description')(),
  require('metascraper-image')(),
  require('metascraper-logo')(),
  require('metascraper-clearbit')(),
  require('metascraper-publisher')(),
  require('metascraper-title')(),
  require('metascraper-url')()
])

export const scrapeMetadata = async (targetURL: string): Promise<Metadata> => {
  if (!isURL(targetURL)) return null

  let res
  try {
    res = await got(targetURL, { timeout: 2000 })
  } catch {
    return null
  }

  const { body: html, url } = res
  if (!isURL(url)) return null
  
  let meta
  try {
    meta = (await metascraper({ html, url })) as Metadata
  } catch {
    return null
  }

  // Strip HTML tags
  if (meta.description)
    meta.description = meta.description.replace(/(<([^>]+)>)/gi, '')

  const uploadUUID = uuidv4()

  if (meta.image) {
    try {
      const response = await fetch(meta.image, { timeout: 2000 })
      const buffer = await response.buffer()
      const type = await fileType.fromBuffer(buffer)
      meta.image = await uploadImage(
        `meta/${uploadUUID}/image.${type.ext}`,
        buffer,
        type.mime
      )
    } catch {
      console.error(`Failed to retrieve or upload image for ${meta.image}`)
    }
  }

  if (meta.logo) {
    try {
      const response = await fetch(meta.logo, { timeout: 2000 })
      const buffer = await response.buffer()
      const type = await fileType.fromBuffer(buffer)
      meta.logo = await uploadImage(
        `metascraper/${uploadUUID}/logo.${type.ext}`,
        buffer,
        type.mime
      )
    } catch {
      console.error(`Failed to retrieve or upload image for ${meta.logo}`)
    }
  }

  return meta
}
