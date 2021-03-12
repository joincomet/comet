import { nanoid } from 'nanoid'
import mime from 'mime'
import sharp from 'sharp'
import s3 from '@/config/s3'
import { FileUpload } from 'graphql-upload'
import got from 'got'
import FileType from 'file-type'

const Bucket = process.env.BUCKET

export const uploadImage = async (
  file: FileUpload | string,
  resize?: any
): Promise<string> => {
  let body
  let ext
  const url = file as string
  file = file as FileUpload
  if (file.createReadStream) {
    const { createReadStream, mimetype } = await file
    if (mimetype !== 'image/jpeg' && mimetype !== 'image/png')
      throw new Error('Image must be PNG or JPEG')
    body = createReadStream()
    ext = mime.getExtension(file.mimetype)
  } else {
    body = got.stream(url)
    const fileType = await FileType.fromStream(body)
    if (fileType.mime !== 'image/jpeg' && fileType.mime !== 'image/png')
      throw new Error('Image must be PNG or JPEG')
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
