import { nanoid } from 'nanoid'
import mime from 'mime'
import sharp from 'sharp'
import s3 from '@/config/s3'
import { FileUpload } from 'graphql-upload'

const Bucket = process.env.BUCKET

export const uploadImage = async (
  file: FileUpload,
  resize?: any
): Promise<string> => {
  const { createReadStream, mimetype } = await file
  if (mimetype !== 'image/jpeg' && mimetype !== 'image/png')
    throw new Error('Image must be PNG or JPEG')
  let body = createReadStream()
  const contentType = file.mimetype

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
