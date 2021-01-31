import 'reflect-metadata'
import { buildSchema } from 'type-graphql'
import { getUserId } from '@/auth/AuthTokens'
import express from 'express'
import cookieParser from 'cookie-parser'
import { ApolloServer, ApolloServerExpressConfig } from 'apollo-server-express'
import { Context } from '@/Context'
import { graphqlUploadExpress } from 'graphql-upload'
import { authChecker } from '@/auth/AuthChecker'
import { userLoader } from '@/user/UserLoader'
import { postLoader } from '@/post/PostLoader'
import { commentLoader } from '@/comment/CommentLoader'
import dayjs from 'dayjs'
import dayjsTwitter from 'dayjs-twitter'
import { MikroORM, ReflectMetadataProvider } from '@mikro-orm/core'

dayjs.extend(dayjsTwitter)

if (!process.env.DATABASE_URL) {
  console.error('DATABASE_URL environment variable missing. Shutting down.')
  process.exit()
}

if (!process.env.DATABASE_NAME) {
  console.error('DATABASE_NAME environment variable missing. Shutting down.')
  process.exit()
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

async function bootstrap() {
  const orm = await MikroORM.init({
    metadataProvider: ReflectMetadataProvider,
    cache: { enabled: false },
    entities: [__dirname + '/**/*.entity.{ts,js}'],
    dbName: process.env.DATABASE_NAME,
    type: 'postgresql',
    clientUrl: process.env.DATABASE_URL,
    debug: process.env.NODE_ENV !== 'production'
  })

  /*const options: Redis.RedisOptions = {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    retryStrategy: times => Math.max(times * 100, 3000)
  }

  const pubSub = new RedisPubSub({
    publisher: new Redis(options),
    subscriber: new Redis(options)
  })*/

  // build TypeGraphQL executable schema
  const schema = await buildSchema({
    resolvers: [__dirname + '/**/*.resolver.{ts,js}'],
    emitSchemaFile: false,
    validate: true,
    authChecker: authChecker,
    authMode: 'null'
    // pubSub
  })

  const app = express()

  app.use(cookieParser())

  app.use(
    graphqlUploadExpress({
      maxFileSize: 16 * 1024 * 1024,
      maxFiles: 10
    })
  )

  const logPlugin = {
    requestDidStart(requestContext: any) {
      const { query, variables } = requestContext.request
      console.log({ query, variables })
      const name = requestContext.request.operationName
      if (!name || name === 'IntrospectionQuery') return
      console.log('GraphQL: ' + name)
    }
  }

  const server = new ApolloServer({
    // plugins: process.env.NODE_ENV === 'production' ? [] : [logPlugin],
    schema,
    playground: process.env.NODE_ENV !== 'production',
    tracing: true,
    context: ({ req, res }) => {
      return {
        em: orm.em.fork(),
        req,
        res,
        userId: getUserId(req.headers.authorization),
        userLoader,
        postLoader,
        commentLoader
      } as Context
    },
    uploads: false,
    introspection: true
  } as ApolloServerExpressConfig)

  server.applyMiddleware({
    app,
    cors: {
      origin:
        process.env.NODE_ENV === 'production'
          ? process.env.CORS_ORIGIN
          : 'http://localhost:3000',
      credentials: true
    }
  })

  app.listen({ port: process.env.PORT || 4000 }, () => {
    console.log(
      `Server ready at http://localhost:${process.env.PORT || 4000}${
        server.graphqlPath
      }`
    )
  })

  /*const planets = await Planet
    .createQueryBuilder('planet')
    .leftJoinAndSelect('planet.channels', 'channel')
    .getMany()

  for (const planet of planets) {
    const channels = planet.channels as ChatChannel[]
    if (channels.length >= 1) {
      if (!planet.defaultChannelId) {
        await planetRepo.update(planet.id, { defaultChannelId: channels[0].id })
      }
      continue
    }
    const channel = ChatChannel.save({
      name: 'general',
      planetId: planet.id
    })
    await planetRepo
      .createQueryBuilder()
      .relation(Planet, 'channels')
      .of(planet.id)
      .add(channel.id)
    await planetRepo.update(planet.id, { defaultChannelId: channel.id })
  }

  const users = await userRepo
    .createQueryBuilder('user')
    .leftJoinAndSelect('user.folders', 'folder')
    .getMany()

  for (const user of users) {
    const folders = user.folders as Folder[]
    if (folders.length >= 2) {
      continue
    }
    const readLater = await folderRepo.save({
      name: 'Read Later',
      creatorId: user.id,
      color: Color.blue
    })

    await folderRepo
      .createQueryBuilder()
      .relation(User, 'folders')
      .of(user.id)
      .add(readLater.id)

    const favorites = await folderRepo.save({
      name: 'Favorites',
      creatorId: user.id,
      color: Color.yellow
    })

    await folderRepo
      .createQueryBuilder()
      .relation(User, 'folders')
      .of(user.id)
      .add(favorites.id)
  }*/
}

bootstrap()
