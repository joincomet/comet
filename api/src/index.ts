import 'reflect-metadata'
import { buildSchema, registerEnumType } from 'type-graphql'
import { Container } from 'typedi'
import { getUser } from '@/Auth'
import express from 'express'
import cookieParser from 'cookie-parser'
import { ApolloServer, ApolloServerExpressConfig } from 'apollo-server-express'
import { Context } from '@/Context'
import {
  CommentLoader,
  CommentUpvoteLoader,
  JoinedLoader,
  PostLoader,
  PostUpvoteLoader,
  UserLoader
} from '@/Loaders'
import { graphqlUploadExpress } from 'graphql-upload'
import * as TypeORM from 'typeorm'
import { authChecker } from '@/AuthChecker'
import { PostSort } from '@/types/posts/PostSort'
import { TimeFilter } from '@/types/posts/TimeFilter'
import { CommentSort } from '@/types/CommentSort'
import { PlanetSort } from '@/types/planet/PlanetSort'
import { ModPermission } from '@/types/planet/ModPermission'
import { connectDatabase } from './ConnectDatabase'

if (!process.env.ACCESS_TOKEN_SECRET) {
  console.error(
    'ACCESS_TOKEN_SECRET environment variable missing. Shutting down.'
  )
  process.exit()
}

TypeORM.useContainer(Container)

async function bootstrap() {
  await connectDatabase()

  registerEnumType(PostSort, {
    name: 'PostSort'
  })

  registerEnumType(TimeFilter, {
    name: 'TimeFilter'
  })

  registerEnumType(CommentSort, {
    name: 'CommentSort'
  })

  registerEnumType(PlanetSort, {
    name: 'PlanetSort'
  })

  registerEnumType(ModPermission, {
    name: 'ModPermission'
  })

  // build TypeGraphQL executable schema
  const schema = await buildSchema({
    resolvers: [__dirname + '/resolvers/**/*.{ts,js}'],
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
      maxFiles: 1
    })
  )

  const logPlugin = {
    requestDidStart(requestContext: any) {
      const name = requestContext.request.operationName
      if (!name || name === 'IntrospectionQuery') return
      console.log('GraphQL: ' + name)
    }
  }

  const server = new ApolloServer({
    plugins: [logPlugin],
    schema,
    playground: process.env.NODE_ENV !== 'production',
    tracing: true,
    context: ({ req, res }: { req: any; res: any }) => {
      return {
        req,
        res,
        ...getUser(req),
        userLoader: UserLoader,
        postLoader: PostLoader,
        commentLoader: CommentLoader,
        joinedLoader: JoinedLoader,
        postUpvoteLoader: PostUpvoteLoader,
        commentUpvoteLoader: CommentUpvoteLoader
      } as Context
    },
    uploads: false,
    introspection: true
  } as ApolloServerExpressConfig)

  server.applyMiddleware({
    app
  })

  app.listen({ port: process.env.PORT || 4000 }, () => {
    console.log(
      `Server ready at http://localhost:${process.env.PORT || 4000}${
        server.graphqlPath
      }`
    )
  })
}

bootstrap()
