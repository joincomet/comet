import 'reflect-metadata'
import { buildSchema } from 'type-graphql'
import { Container } from 'typedi'
import { getUser } from '@/auth/AuthTokens'
import express from 'express'
import cookieParser from 'cookie-parser'
import { ApolloServer, ApolloServerExpressConfig } from 'apollo-server-express'
import { Context } from '@/Context'
import { graphqlUploadExpress } from 'graphql-upload'
import * as TypeORM from 'typeorm'
import { getRepository } from 'typeorm'
import { authChecker } from '@/auth/AuthChecker'
import { connectDatabase } from './ConnectDatabase'
import { userLoader } from '@/user/UserLoader'
import { postLoader } from '@/post/PostLoader'
import { commentLoader } from '@/comment/CommentLoader'
import dayjs from 'dayjs'
import dayjsTwitter from 'dayjs-twitter'
import { discordClient } from '@/discord/DiscordClient'
import { Planet } from '@/planet/Planet.Entity'
import { ChatChannel } from '@/chat/ChatChannel.Entity'
import { User } from '@/user/User.Entity'
import { Folder } from '@/folder/Folder.Entity'
import { Color } from '@/Color'

const REDIS_HOST = 'http://redis'
const REDIS_PORT = 6379

dayjs.extend(dayjsTwitter)

if (!process.env.ACCESS_TOKEN_SECRET) {
  console.error(
    'ACCESS_TOKEN_SECRET environment variable missing. Shutting down.'
  )
  process.exit()
}

TypeORM.useContainer(Container)

async function bootstrap() {
  await connectDatabase()

  /*const options: Redis.RedisOptions = {
    host: REDIS_HOST,
    port: REDIS_PORT,
    retryStrategy: times => Math.max(times * 100, 3000)
  }

  const pubSub = new RedisPubSub({
    publisher: new Redis(options),
    subscriber: new Redis(options)
  })*/

  // build TypeGraphQL executable schema
  const schema = await buildSchema({
    resolvers: [__dirname + '/**/*.Resolver.{ts,js}'],
    emitSchemaFile: false,
    container: Container,
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
    context: ({ req, res }: { req: any; res: any }) => {
      return {
        req,
        res,
        ...getUser(req.cookies.accessToken),
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

  await discordClient.login(process.env.DISCORD_TOKEN)

  const planetRepo = getRepository(Planet)

  const planets = await planetRepo
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
    const channel = await getRepository(ChatChannel).save({
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

  const userRepo = getRepository(User)
  const folderRepo = getRepository(Folder)

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
  }
}

bootstrap()
