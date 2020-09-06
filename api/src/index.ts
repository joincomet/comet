import 'reflect-metadata'
import { buildSchema, registerEnumType } from 'type-graphql'
import * as TypeORM from 'typeorm'
import { getRepository } from 'typeorm'
import { Container } from 'typedi'
import { getUser } from '@/auth'
import express from 'express'
import cookieParser from 'cookie-parser'
import { ApolloServer } from 'apollo-server-express'
import { Context } from '@/Context'
import {
  CommentLoader,
  PostLoader,
  PostViewLoader,
  UserLoader
} from '@/loaders'
import { PostType } from '@/entities/Post'
import { Filter, Sort, Time, Type } from '@/args/FeedArgs'
import { CommentSort } from '@/args/UserCommentsArgs'
import { Galaxy } from '@/entities/Galaxy'
import { galaxiesList } from '@/galaxiesList'
import { graphqlUploadExpress } from 'graphql-upload'

if (!process.env.ACCESS_TOKEN_SECRET) {
  console.error(
    'ACCESS_TOKEN_SECRET environment variable missing. Shutting down.'
  )
  process.exit()
}

// register 3rd party IOC container
TypeORM.useContainer(Container)

async function bootstrap() {
  try {
    await TypeORM.createConnection({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT as string),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [__dirname + '/entities/**/*.{ts,js}'],
      synchronize: true,
      logging: true,
      dropSchema: false, // CLEARS DATABASE ON START
      cache: true
    })

    getRepository(Galaxy).save(galaxiesList)

    registerEnumType(PostType, {
      name: 'PostType'
    })

    registerEnumType(Sort, {
      name: 'Sort'
    })

    registerEnumType(Time, {
      name: 'Time'
    })

    registerEnumType(Filter, {
      name: 'Filter'
    })

    registerEnumType(Type, {
      name: 'Type'
    })

    registerEnumType(CommentSort, {
      name: 'CommentSort'
    })

    // build TypeGraphQL executable schema
    const schema = await buildSchema({
      resolvers: [__dirname + '/resolvers/**/*.{ts,js}'],
      emitSchemaFile: false,
      container: Container,
      validate: true
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
        console.log('GraphQL: ' + requestContext.request.operationName)
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
          userId: getUser(req),
          userLoader: UserLoader,
          postLoader: PostLoader,
          commentLoader: CommentLoader,
          postViewLoader: PostViewLoader
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
