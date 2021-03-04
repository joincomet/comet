import 'reflect-metadata'
import { buildSchema } from 'type-graphql'
import { getUserId } from '@/auth/AuthTokens'
import express from 'express'
import cookieParser from 'cookie-parser'
import {
  ApolloServer,
  ApolloServerExpressConfig,
  PubSub
} from 'apollo-server-express'
import { Context } from '@/types/Context'
import { graphqlUploadExpress } from 'graphql-upload'
import { authChecker } from '@/auth/AuthChecker'
import { MikroORM, ReflectMetadataProvider } from '@mikro-orm/core'
import { UserResolver } from '@/user/User.resolver'
import { CommentResolver } from '@/comment/Comment.resolver'
import { PostResolver } from '@/post/Post.resolver'
import { AdminResolver } from '@/moderation/Admin.resolver'
import { ModerationResolver } from '@/moderation/Moderation.resolver'
import { ServerResolver } from '@/server/Server.resolver'
import { FolderResolver } from '@/folder/Folder.resolver'
import { ChatResolver } from '@/chat/Chat.resolver'
import { Channel } from '@/chat/Channel.entity'
import { Metadata } from '@/metascraper/Metadata.entity'
import { NotificationResolver } from '@/notification/Notification.resolver'
import { Notification } from '@/notification/Notification.entity'
import { BaseEntity } from '@/types/Base.entity'
import { Group } from '@/chat/Group.entity'
import { Message } from '@/chat/Message.entity'
import { Comment } from '@/comment/Comment.entity'
import { Folder } from '@/folder/Folder.entity'
import { Server } from '@/server/Server.entity'
import { User } from '@/user/User.entity'
import { AuthResolver } from '@/auth/Auth.Resolver'
import { Post } from '@/post/Post.entity'
import { ServerInvite } from '@/server/ServerInvite.entity'
import * as http from 'http'
import { getPubSub } from '@/subscriptions'

if (process.env.NODE_ENV === 'production') {
  if (!process.env.DATABASE_URL) {
    console.error('DATABASE_URL environment variable missing. Shutting down.')
    process.exit()
  }
  if (!process.env.DATABASE_NAME) {
    console.error('DATABASE_NAME environment variable missing. Shutting down.')
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

async function bootstrap() {
  console.log(`Initializing database connection...`)
  const orm = await MikroORM.init({
    metadataProvider: ReflectMetadataProvider,
    cache: { enabled: false },
    entities: [
      BaseEntity,
      Channel,
      Group,
      Message,
      Comment,
      Folder,
      Metadata,
      Notification,
      Server,
      ServerInvite,
      Post,
      User
    ],
    type: 'postgresql',
    clientUrl:
      process.env.DATABASE_URL ||
      'postgresql://postgres:password@localhost:5432',
    dbName: process.env.DATABASE_NAME || 'postgres',
    debug: process.env.NODE_ENV !== 'production',
    forceUtcTimezone: true
  })

  if (process.env.NODE_ENV !== 'production') {
    console.log(`Setting up the database...`)
    const generator = orm.getSchemaGenerator()
    // await generator.dropSchema()
    // await generator.createSchema()
    await generator.updateSchema()
  }

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
      ServerResolver,
      PostResolver,
      UserResolver
    ],
    emitSchemaFile: false,
    validate: true,
    authChecker: authChecker,
    pubSub: getPubSub()
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
    schema,
    playground: process.env.NODE_ENV !== 'production',
    tracing: true,
    context: async ({ req, res, connection }) => {
      const em = orm.em.fork()
      const userId = connection
        ? connection.context.userId
        : getUserId(req.headers.authorization)
      const user = userId ? await em.findOne(User, userId) : null
      return {
        em,
        req,
        res,
        user
      } as Context
    },
    uploads: false,
    introspection: true,
    subscriptions: {
      onConnect: (connectionParams: { authorization: string }, webSocket) => {
        if (connectionParams.authorization) {
          return {
            userId: getUserId(connectionParams.authorization)
          }
        } else {
          return { userId: null }
        }
      }
    }
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

  const httpServer = http.createServer(app)
  server.installSubscriptionHandlers(httpServer)

  const PORT = process.env.PORT || 4000
  httpServer.listen(PORT, () => {
    console.log(
      `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
    )
    console.log(
      `🚀 Subscriptions ready at ws://localhost:${PORT}${server.subscriptionsPath}`
    )
  })
}

bootstrap().catch(console.error)
