import { nanoid } from 'nanoid'
import mime from 'mime'
import sharp from 'sharp'
import s3 from '@/config/s3'

const Bucket = process.env.BUCKET

export const uploadImage = async (
  body: any,
  contentType: string,
  resize?: any
): Promise<string> => {
  const ext = mime.getExtension(contentType)
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
    return new Promise<string>((resolve, reject) => {
      upload.send((err, result) => {
        if (err) {
          reject(err)
        }

        resolve(`https://${process.env.MEDIA_DOMAIN}/${key}`)
      })
    })
  } catch (e) {
    throw e
  }
}
