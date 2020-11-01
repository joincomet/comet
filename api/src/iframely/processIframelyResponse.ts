import { IframelyResponse } from '@/iframely/IframelyResponse'
import { Post } from '@/post/Post.Entity'
import { Embed } from '@/post/Embed'
import { uploadImage } from '@/S3Storage'
import fetch from 'node-fetch'
import fileType from 'file-type'

/**
 * Uploads thumbnail and icon images from IframelyResponse to S3 bucket during post creation
 * @param res The IframelyResponse
 * @param post The post being created
 */
export const processIframelyResponse = async (
  res: IframelyResponse,
  post: Post
): Promise<Embed | null> => {
  if (!res) return null
  let embed: Embed = null
  if (res.meta) {
    const { title, description } = res.meta
    embed = {
      title: title || null,
      description: description ? description.replace(/(<([^>]+)>)/gi, '') : null // Strip HTML tags
    }
  }
  if (res.links) {
    const { thumbnail } = res.links
    if (thumbnail && thumbnail.length > 0) {
      try {
        const response = await fetch(thumbnail[0].href, { timeout: 5000 })
        const buffer = await response.buffer()
        const type = await fileType.fromBuffer(buffer)
        const url = await uploadImage(
          `post/${post.id36}/thumbnail.${type.ext}`,
          buffer,
          type.mime
        )
        if (!embed) embed = {}
        embed.thumbnailURL = url
      } catch {}
    }

    let { icon } = res.links
    if (icon) icon = icon.filter(i => i.type === 'image/png')

    if (icon && icon.length > 0 && post.domain) {
      try {
        const response = await fetch(icon[0].href, { timeout: 5000 })
        const buffer = await response.buffer()
        const type = await fileType.fromBuffer(buffer)
        const url = await uploadImage(
          `favicons/${post.domain}.${type.ext}`,
          buffer,
          type.mime
        )
        if (!embed) embed = {}
        embed.faviconURL = url
      } catch {}
    }
  }

  return embed
}
