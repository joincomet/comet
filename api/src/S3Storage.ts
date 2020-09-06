import shortid from 'shortid'
import AWS from 'aws-sdk'

if (
  process.env.AWS_S3_BUCKET &&
  process.env.AWS_ACCESS_KEY_ID &&
  process.env.AWS_SECRET_ACCESS_KEY
) {
  AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  })
} else {
  console.warn('Missing AWS environment variables. Image upload will not work.')
}

export const s3 = new AWS.S3({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string
  }
})

export const s3upload = async (
  Key: string,
  Body: any,
  ContentType: string,
  cacheBust = true
): Promise<string> => {
  const upload = s3.upload({
    Bucket: process.env.AWS_S3_BUCKET as string,
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
