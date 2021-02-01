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
import { UserResolver } from '@/user/User.resolver'
import { CommentResolver } from '@/comment/Comment.resolver'
import { PostResolver } from '@/post/Post.resolver'
import { AdminResolver } from '@/moderation/Admin.resolver'
import { ModerationResolver } from '@/moderation/Moderation.resolver'
import { PlanetResolver } from '@/planet/Planet.resolver'
import { FolderResolver } from '@/folder/Folder.resolver'
import { ChatResolver } from '@/chat/Chat.resolver'
import { ChatChannel } from '@/chat/ChatChannel.entity'
import { EditableEntity } from '@/Editable.entity'
import { Metadata } from '@/metascraper/Metadata.entity'
import { NotificationResolver } from '@/notification/Notification.resolver'
import { Notification } from '@/notification/Notification.entity'
import { BaseEntity } from '@/Base.entity'
import { ChatGroup } from '@/chat/ChatGroup.entity'
import { ChatMessage } from '@/chat/ChatMessage.entity'
import { Comment } from '@/comment/Comment.entity'
import { Folder } from '@/folder/Folder.entity'
import { Planet } from '@/planet/Planet.entity'
import { User } from '@/user/User.entity'
import { AuthResolver } from '@/auth/Auth.Resolver'
import { Post } from '@/post/Post.entity'

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

if (process.env.NODE_ENV === 'production' && !process.env.CORS_ORIGIN) {
  console.error('CORS_ORIGIN environment variable missing. Shutting down.')
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
  console.log(`Initializing database connection...`)
  const orm = await MikroORM.init({
    metadataProvider: ReflectMetadataProvider,
    cache: { enabled: false },
    entities: [
      BaseEntity,
      ChatChannel,
      ChatGroup,
      ChatMessage,
      Comment,
      EditableEntity,
      Folder,
      Metadata,
      Notification,
      Planet,
      Post,
      User
    ],
    type: 'postgresql',
    clientUrl:
      process.env.DATABASE_URL ||
      'postgresql://postgres:password@localhost:5432',
    dbName: process.env.DATABASE_NAME || 'postgres',
    debug: process.env.NODE_ENV !== 'production'
  })

  if (process.env.NODE_ENV !== 'production') {
    console.log(`Setting up the database...`)
    const generator = orm.getSchemaGenerator()
    await generator.dropSchema()
    await generator.createSchema()
    await generator.updateSchema()
  }

  /*const options: Redis.RedisOptions = {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    retryStrategy: times => Math.max(times * 100, 3000)
  }

  const pubSub = new RedisPubSub({
    publisher: new Redis(options),
    subscriber: new Redis(options)
  })*/

  console.log(`Bootstraping schema and server...`)
  const schema = await buildSchema({
    resolvers: [
      AdminResolver,
      AuthResolver,
      ChatResolver,
      CommentResolver,
      FolderResolver,
      ModerationResolver,
      NotificationResolver,
      PlanetResolver,
      PostResolver,
      UserResolver
    ],
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

bootstrap().catch(console.error)
