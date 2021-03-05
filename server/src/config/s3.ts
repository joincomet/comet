import AWS from 'aws-sdk'

export default new AWS.S3({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string
  },
  endpoint: `https://${process.env.AWS_ENDPOINT}`
})
