export default () => {
  if (process.env.NODE_ENV === 'production') {
    if (!process.env.DATABASE_URL) {
      console.error('DATABASE_URL environment variable missing. Shutting down.')
      process.exit()
    }
    if (!process.env.DATABASE_NAME) {
      console.error(
        'DATABASE_NAME environment variable missing. Shutting down.'
      )
      process.exit()
    }
    if (!process.env.CORS_ORIGIN) {
      console.error('CORS_ORIGIN environment variable missing. Shutting down.')
      process.exit()
    }
  }

  if (!process.env.ACCESS_TOKEN_SECRET) {
    console.error(
      'ACCESS_TOKEN_SECRET environment variable missing. Shutting down.'
    )
    process.exit()
  }

  if (
    !(
      process.env.BUCKET &&
      process.env.MEDIA_DOMAIN &&
      process.env.AWS_ACCESS_KEY_ID &&
      process.env.AWS_SECRET_ACCESS_KEY &&
      process.env.AWS_ENDPOINT
    )
  ) {
    console.warn(
      `
    Image uploading disabled. To enable, set the following environment variables: 
    BUCKET=<name of bucket i.e. comet>
    MEDIA_DOMAIN=<bucket domain i.e. media.cometx.io>
    AWS_ACCESS_KEY_ID=<AWS access key ID>
    AWS_SECRET_ACCESS_KEY=<AWS secret access key>
    AWS_ENDPOINT=<AWS endpoint i.e. nyc3.digitaloceanspaces.com>
    `
    )
  }
}
