import { nanoid } from 'nanoid'
import mime from 'mime'
import sharp, { Metadata, ResizeOptions } from 'sharp'
import s3 from '@/config/s3'
import { FileUpload } from 'graphql-upload'
import got from 'got'
import FileType from 'file-type'

const Bucket = process.env.BUCKET

export const uploadImage = async ({
  file,
  url,
  resize
}: {
  file?: FileUpload
  url?: string
  resize?: ResizeOptions
}): Promise<{ url: string; metadata: Metadata }> => {
  let body
  let ext
  if (file) {
    const { createReadStream, mimetype } = await file
    if (mimetype !== 'image/jpeg' && mimetype !== 'image/png')
      throw new Error('error.upload.invalidMime')
    body = createReadStream()
    ext = mime.getExtension(mimetype)
  } else {
    body = got.stream(url)
    const fileType = await FileType.fromStream(body)
    if (fileType.mime !== 'image/jpeg' && fileType.mime !== 'image/png')
      throw new Error('error.upload.invalidMime')
    ext = fileType.ext
  }
  const key = `${nanoid()}.${ext}`

  const s = sharp().webp({ quality: 75 })
  if (resize) s.resize(resize)
  body = body.pipe(s)

  const upload = s3.upload({
    Bucket,
    Key: key,
    Body: body,
    ContentType: 'image/webp',
    ACL: 'public-read',
    CacheControl: 'max-age=2592000'
  })

  try {
    const metadata = await s.metadata()
    return new Promise<{ url: string; metadata: Metadata }>(
      (resolve, reject) => {
        upload.send((err, result) => {
          if (err) {
            reject(err)
          }

          resolve({
            url: `https://${process.env.MEDIA_DOMAIN}/${key}`,
            metadata
          })
        })
      }
    )
  } catch (e) {
    throw e
  }
}

export const calculateDimensions = ({
  width,
  height,
  maxWidth,
  maxHeight
}: {
  width: number
  height: number
  maxWidth: number
  maxHeight: number
}): { width: number; height: number } => {
  if (width > maxWidth) {
    const ratio = height / width
    width = maxWidth
    height = Math.round(width * ratio)
  }

  if (height > maxHeight) {
    const ratio = width / height
    height = maxHeight
    width = Math.round(height * ratio)
  }

  return { width, height }
}
