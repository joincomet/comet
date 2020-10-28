import AWS from 'aws-sdk'

const Bucket = process.env.AWS_S3_BUCKET

export const s3 = new AWS.S3({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string
  },
  endpoint: `https://${process.env.AWS_S3_BUCKET}.${process.env.AWS_ENDPOINT}`
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
  key: string,
  body: any,
  contentType: string
): Promise<string> => {
  const upload = s3.upload({
    Bucket,
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

        resolve(`https://${process.env.NEXT_IMAGES_DOMAIN}/${key}`)
      })
    })
  } catch (e) {
    throw e
  }
}
