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
import { Client } from '@typeit/discord'
import { discordClient } from '@/discord/DiscordClient'

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

  // build TypeGraphQL executable schema
  const schema = await buildSchema({
    resolvers: [__dirname + '/**/*.Resolver.{ts,js}'],
    emitSchemaFile: false,
    container: Container,
    validate: true,
    authChecker: authChecker,
    authMode: 'null'
  })

  const app = express()

  app.use(cookieParser())

  app.use(
    graphqlUploadExpress({
      maxFileSize: 16 * 1024 * 1024,
      maxFiles: 20
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
}

bootstrap()
