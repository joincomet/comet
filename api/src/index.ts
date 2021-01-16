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
import { authChecker } from '@/auth/AuthChecker'
import { connectDatabase } from './ConnectDatabase'
import { userLoader } from '@/user/UserLoader'
import { postLoader } from '@/post/PostLoader'
import { commentLoader } from '@/comment/CommentLoader'
import { joinedLoader } from '@/planet/JoinedLoader'
import { postRocketedLoader } from '@/post/PostRocketedLoader'
import { commentRocketedLoader } from '@/comment/CommentRocketedLoader'
import dayjs from 'dayjs'
import dayjsTwitter from 'dayjs-twitter'
import { followedLoader } from '@/user/FollowedLoader'
import { followingLoader } from '@/user/FollowingLoader'
import { discordClient } from '@/discord/DiscordClient'
import * as Redis from 'ioredis'
import { RedisPubSub } from 'graphql-redis-subscriptions'
import { getRepository } from 'typeorm'
import { Planet } from '@/planet/Planet.Entity'
import { ChatChannel } from '@/chat/ChatChannel.Entity'

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
        commentLoader,
        joinedLoader,
        postRocketedLoader,
        commentRocketedLoader,
        followingLoader,
        followedLoader
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
}

bootstrap()
