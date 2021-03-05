import 'reflect-metadata'
import { buildSchema } from 'type-graphql'
import { getUserId } from '@/util/auth'
import express from 'express'
import cookieParser from 'cookie-parser'
import { ApolloServer, ApolloServerExpressConfig } from 'apollo-server-express'
import { Context } from '@/types'
import { graphqlUploadExpress } from 'graphql-upload'
import { MikroORM } from '@mikro-orm/core'
import { User } from '@/entity'
import * as http from 'http'
import { onConnect } from '@/config/redis'
import checkEnv from '@/util/checkEnv'
import mikroOrmConf from '@/config/mikroOrm'
import typeGraphQLConf from '@/config/typeGraphQL'

checkEnv()

async function bootstrap() {
  console.log(`Initializing database connection...`)
  const orm = await MikroORM.init(mikroOrmConf)

  if (process.env.NODE_ENV !== 'production') {
    console.log(`Setting up the database...`)
    const generator = orm.getSchemaGenerator()
    // await generator.dropSchema()
    // await generator.createSchema()
    await generator.updateSchema()
  }

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
