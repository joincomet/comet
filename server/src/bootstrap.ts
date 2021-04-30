import { MikroORM } from '@mikro-orm/core'
import { mikroOrmConf } from '@/config/mikro-orm.config'
import { buildSchema } from 'type-graphql'
import { typeGraphQLConf } from '@/config/typeGraphQL'
import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import ws from 'ws' // yarn add ws
import { useServer } from 'graphql-ws/lib/use/ws'
import { specifiedRules } from 'graphql'
import { NoLiveMixedWithDeferStreamRule } from '@n1ru4l/graphql-live-query'
import { graphqlUploadExpress } from 'graphql-upload'
import { getUserId, RedisLiveQueryStore } from '@/util'
import { Context } from '@/types'
import { createLoaders } from '@/util/loaders/createLoaders'
import cors from 'cors'
import { InMemoryLiveQueryStore } from '@n1ru4l/in-memory-live-query-store'
import { Disposable } from 'graphql-ws'

const validationRules = [...specifiedRules, NoLiveMixedWithDeferStreamRule]

export async function bootstrap() {
  console.log(`Initializing database connection...`)
  const orm = await MikroORM.init(mikroOrmConf)

  if (process.env.NODE_ENV !== 'production') {
    console.log(`Setting up the database...`)
    const generator = orm.getSchemaGenerator()
    // await generator.dropSchema(false)
    // await generator.createSchema(false)
    await generator.updateSchema(false)
  }

  console.log(`Bootstraping schema and server...`)
  const liveQueryStore =
    process.env.NODE_ENV === 'production'
      ? new RedisLiveQueryStore(process.env.REDIS_URL)
      : new InMemoryLiveQueryStore()
  const schema = await buildSchema(typeGraphQLConf)

  const app = express()
  app.use(cors({ origin: true }))
  app.use(
    graphqlUploadExpress({
      maxFileSize: 32 * 1024 * 1024, // 32MB limit
      maxFiles: 20
    })
  )
  const apolloServer = new ApolloServer({
    uploads: false,
    schema,
    validationRules,
    context: ({ req }) => {
      const em = orm.em.fork()
      const userId = getUserId(req.headers.token as string)
      return {
        em,
        userId,
        liveQueryStore,
        loaders: createLoaders(em, userId)
      } as Context
    }
  })
  apolloServer.applyMiddleware({ app })

  const port = +process.env.PORT || 4000

  let graphqlWs: Disposable
  const server = app.listen(port, () => {
    // create and use the websocket server
    const wsServer = new ws.Server({
      server,
      path: '/graphql'
    })

    graphqlWs = useServer(
      {
        schema,
        execute: args => liveQueryStore.execute(args),
        context: ({ connectionParams }) => {
          const userId = getUserId(connectionParams?.token as string)
          const em = orm.em.fork()
          return {
            em,
            liveQueryStore,
            userId,
            loaders: createLoaders(em, userId)
          } as Context
        }
      },
      wsServer
    )
  })

  process.once('SIGINT', () => {
    console.log('Received SIGINT. Shutting down HTTP and Websocket server.')
    graphqlWs?.dispose()
    server.close()
    orm.close()
  })
}
