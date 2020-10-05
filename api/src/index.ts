import 'reflect-metadata'
import { buildSchema, registerEnumType } from 'type-graphql'
import * as TypeORM from 'typeorm'
import { Container } from 'typedi'
import { getUser } from '@/Auth'
import express from 'express'
import cookieParser from 'cookie-parser'
import { ApolloServer } from 'apollo-server-express'
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
import fs from 'fs'
import path from 'path'
import { authChecker } from '@/AuthChecker'
import { PostSort } from '@/types/PostSort'
import { TimeFilter } from '@/types/TimeFilter'
import { Feed } from '@/types/Feed'
import { CommentSort } from '@/types/CommentSort'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'
import { CommunitySort } from '@/types/CommunitySort'
import { ModPermission } from '@/types/ModPermission'

if (!process.env.ACCESS_TOKEN_SECRET) {
  console.error(
    'ACCESS_TOKEN_SECRET environment variable missing. Shutting down.'
  )
  process.exit()
}

TypeORM.useContainer(Container)

async function bootstrap() {
  try {
    await TypeORM.createConnection({
      type: 'postgres',
      username:
        process.env.NODE_ENV === 'production'
          ? process.env.DB_USERNAME
          : 'postgres',
      password:
        process.env.NODE_ENV === 'production'
          ? process.env.DB_PASSWORD
          : 'password',
      host:
        process.env.NODE_ENV === 'production'
          ? process.env.DB_HOST
          : 'postgres',
      port:
        process.env.NODE_ENV === 'production'
          ? parseInt(process.env.DB_PORT)
          : 5432,
      database:
        process.env.NODE_ENV === 'production'
          ? process.env.DB_DATABASE
          : 'postgres',
      // url: process.env.NODE_ENV === 'production' ? process.env.DATABASE_URL : 'postgresql://postgres:password@postgres:5432/postgres',
      entities: [__dirname + '/entities/**/*.{ts,js}'],
      synchronize: true,
      logging: process.env.NODE_ENV !== 'production',
      dropSchema: false, // CLEARS DATABASE ON START
      cache: true,
      ssl:
        process.env.NODE_ENV === 'production'
          ? {
              ca: fs.readFileSync(
                path.resolve(__dirname, '../ca-certificate.crt'),
                { encoding: 'utf8' }
              )
            }
          : undefined,
      namingStrategy: new SnakeNamingStrategy()
    })

    registerEnumType(PostSort, {
      name: 'PostSort'
    })

    registerEnumType(TimeFilter, {
      name: 'TimeFilter'
    })

    registerEnumType(Feed, {
      name: 'Feed'
    })

    registerEnumType(CommentSort, {
      name: 'CommentSort'
    })

    registerEnumType(CommunitySort, {
      name: 'CommunitySort'
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
        maxFileSize: 4 * 1024 * 1024,
        maxFiles: 1
      })
    )

    const logPlugin = {
      requestDidStart(requestContext: any) {
        const name = requestContext.request.operationName
        if (name === 'IntrospectionQuery') return
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
    })

    server.applyMiddleware({
      app
    })

    app.listen({ port: process.env.PORT || 4000 }, () => {
      console.log(`Server ready at http://localhost:4000${server.graphqlPath}`)
    })
  } catch (e) {
    console.error(e)
  }
}

bootstrap()
