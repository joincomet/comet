import AWS from 'aws-sdk'
import { v4 as uuidv4 } from 'uuid'
import mime from 'mime'

const Bucket = process.env.BUCKET

export const s3 = new AWS.S3({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string
  },
  endpoint: `https://${process.env.AWS_ENDPOINT}`
})

export const hasFile = async (key: string) => {
  try {
    await s3
      .headObject({
        Bucket,
        Key: key
      })
      .promise()
    return true
  } catch (e) {
    if (e.code === 'NotFound') {
      return false
    }
    throw e
  }
}

export const uploadImage = async (
  body: any,
  contentType: string
): Promise<string> => {
  const uuid = uuidv4()
  const ext = mime.getExtension(contentType)
  const key = `${uuid}.${ext}`

  const upload = s3.upload({
    Bucket,
    Key: key,
    Body: body,
    ContentType: contentType,
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
