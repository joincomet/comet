import { MikroORM } from '@mikro-orm/core'
import mikroOrmConf from '@/config/mikroOrm'
import { buildSchema } from 'type-graphql'
import typeGraphQLConf from '@/config/typeGraphQL'
import express from 'express'
import cookieParser from 'cookie-parser'
import { graphqlUploadExpress } from 'graphql-upload'
import { ApolloServer, ApolloServerExpressConfig } from 'apollo-server-express'
import { getUserId } from '@/util'
import { User } from '@/entity'
import { Context } from '@/types'
import { onConnect } from '@/config/redis'
import http from 'http'
import { seed } from '@/seed'

export async function bootstrap() {
  console.log(`Initializing database connection...`)
  const orm = await MikroORM.init(mikroOrmConf)

  // TODO don't seed in production
  // if (process.env.NODE_ENV !== 'production') {
  console.log(`Setting up the database...`)
  const generator = orm.getSchemaGenerator()
  await generator.dropSchema(false)
  await generator.createSchema(false)
  await generator.updateSchema(false)

  await seed(orm.em.fork())
  // }

  console.log(`Bootstraping schema and server...`)
  const schema = await buildSchema(typeGraphQLConf)

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
    context: async ({ req, connection }) => {
      const em = orm.em.fork()
      const userId = connection
        ? connection.context.userId
        : getUserId(req.headers.authorization)
      const user = userId ? await em.findOne(User, userId) : null
      return {
        em,
        user
      } as Context
    },
    uploads: false,
    introspection: true,
    subscriptions: {
      onConnect
    }
  } as ApolloServerExpressConfig)

  await server.start()

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

  const PORT = process.env.PORT ?? 4000
  httpServer.listen(PORT, () => {
    console.log(
      `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
    )
    console.log(
      `🚀 Subscriptions ready at ws://localhost:${PORT}${server.subscriptionsPath}`
    )
  })
}
