import { MikroORM } from '@mikro-orm/core'
import { mikroOrmConf } from '@/config/mikro-orm.config'
import { buildSchema } from 'type-graphql'
import { typeGraphQLConf } from '@/config/typegraphql.config'
import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import ws from 'ws' // yarn add ws
import { useServer } from 'graphql-ws/lib/use/ws'
import { ExecutionArgs, parse, specifiedRules, validate } from 'graphql'
import { NoLiveMixedWithDeferStreamRule } from '@n1ru4l/graphql-live-query'
import { graphqlUploadExpress } from 'graphql-upload'
import { getUserFromToken, MAX_FILE_SIZE, RedisLiveQueryStore } from '@/util'
import { Context } from '@/types'
import { createLoaders } from '@/util/loaders/createLoaders'
import cors from 'cors'
import { InMemoryLiveQueryStore } from '@n1ru4l/in-memory-live-query-store'
import { Disposable } from 'graphql-ws'
import { seed } from '@/seed/seed'
import { createServer } from 'http'

const validationRules = [...specifiedRules, NoLiveMixedWithDeferStreamRule]

const RESET = false // set TRUE to WIPE AND RESET DATABASE in dev

export async function bootstrap() {
  console.log(`Initializing database connection...`)
  const orm = await MikroORM.init(mikroOrmConf)

  if (process.env.NODE_ENV !== 'production') {
    console.log(`Setting up the database...`)
    const generator = orm.getSchemaGenerator()
    if (RESET) {
      await generator.dropSchema(false)
      await generator.createSchema(false)
    }
    await generator.updateSchema(false)
  }

  console.log(`Bootstraping schema and server...`)
  const liveQueryStore =
    process.env.NODE_ENV === 'production' && process.env.REDIS_URL
      ? new RedisLiveQueryStore(process.env.REDIS_URL)
      : new InMemoryLiveQueryStore()
  const schema = await buildSchema(typeGraphQLConf)

  const app = express()
  const httpServer = createServer(app)
  app.use(cors({ origin: true }))
  app.use(
    graphqlUploadExpress({
      maxFileSize: MAX_FILE_SIZE,
      maxFiles: 20
    })
  )
  const apolloServer = new ApolloServer({
    schema,
    validationRules,
    context: ({ req }) => {
      const em = orm.em.fork()
      const user = getUserFromToken(req.headers.token as string)
      if (user) {
        ;(req as any).user = user
      }
      return {
        em,
        userId: user?.id,
        liveQueryStore,
        loaders: createLoaders(em, user?.id)
      } as Context
    }
  })
  await apolloServer.start()
  apolloServer.applyMiddleware({ app })

  const port = +process.env.PORT || 4000

  let graphqlWs: Disposable
  const server = httpServer.listen(port, () => {
    console.log(`Listening on port ${port}`)
    // create and use the websocket server
    const wsServer = new ws.Server({
      server,
      path: '/graphql'
    })

    graphqlWs = useServer(
      {
        schema,
        execute: args => liveQueryStore.execute(args),
        onSubscribe: ({ connectionParams }, msg) => {
          const user = getUserFromToken(connectionParams?.token as string)
          const em = orm.em.fork()
          const contextValue = {
            em,
            liveQueryStore,
            userId: user?.id,
            loaders: createLoaders(em, user?.id)
          } as Context

          const args: ExecutionArgs = {
            schema,
            operationName: msg.payload.operationName,
            document: parse(msg.payload.query),
            variableValues: msg.payload.variables,
            contextValue
          }

          const errors = validate(args.schema, args.document, [
            ...specifiedRules,
            NoLiveMixedWithDeferStreamRule
          ])

          if (errors.length) return errors

          return args
        }
      },
      wsServer
    )
  })

  ;['SIGINT', 'SIGTERM'].forEach(signal => {
    process.on(signal, () => {
      console.log('Received SIGINT. Shutting down HTTP and Websocket server.')
      graphqlWs?.dispose()
      server.close()
      orm.close()
    })
  })

  await seed(orm.em.fork())
}
