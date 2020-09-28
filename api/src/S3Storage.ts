import AWS from 'aws-sdk'

export const s3 = new AWS.S3({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEYid as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string
  },
  endpoint: `https://${process.env.AWS_S3_BUCKET}.${process.env.AWS_ENDPOINT}`
})

export const s3upload = async (
  key: string,
  body: any,
  contentType: string
): Promise<string> => {
  if (process.env.NODE_ENV !== 'production') {
    key = 'dev/' + key
  } else if (process.env.STAGING === 'true') {
    key = 'staging/' + key
  }
  const upload = s3.upload({
    Bucket: process.env.AWS_S3_BUCKET,
    Key: key,
    Body: body,
    ContentType: contentType,
    ACL: 'public-read'
  })

  try {
    return new Promise<string>((resolve, reject) => {
      upload.send((err, result) => {
        if (err) {
          reject(err)
        }

        resolve(`https://${process.env.AWS_S3_BUCKET}/${key}`)
      })
    })
  } catch (e) {
    throw e
  }
}
