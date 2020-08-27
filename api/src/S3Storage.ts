import shortid from 'shortid'
import { s3 } from './s3'

export const s3upload = async (
  Key: string,
  Body: any,
  ContentType: string,
  cacheBust = true
): Promise<string> => {
  const upload = s3.upload({
    Bucket: process.env.AWS_S3_BUCKET,
    Key,
    Body,
    ContentType,
    ACL: 'public-read'
  })

  try {
    return new Promise<string>((resolve, reject) => {
      upload.send((err, result) => {
        if (err) {
          reject(err)
        }

        resolve(
          `${result.Location.replace('s3.amazonaws.com/', '')}${
            cacheBust ? '?rand=' + shortid.generate() : ''
          }`
        )
      })
    })
  } catch (e) {
    throw e
  }
}
