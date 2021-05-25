import { MikroORM } from '@mikro-orm/core'
import { mikroOrmConf } from '@/config/mikro-orm.config'
import { buildSchema } from 'type-graphql'
import { typeGraphQLConf } from '@/config/typegraphql.config'
import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import ws from 'ws' // yarn add ws
import { useServer } from 'graphql-ws/lib/use/ws'
import { specifiedRules } from 'graphql'
import { NoLiveMixedWithDeferStreamRule } from '@n1ru4l/graphql-live-query'
import { graphqlUploadExpress } from 'graphql-upload'
import { getUserFromToken, MAX_FILE_SIZE, RedisLiveQueryStore } from '@/util'
import { Context } from '@/types'
import { createLoaders } from '@/util/loaders/createLoaders'
import cors from 'cors'
import { InMemoryLiveQueryStore } from '@n1ru4l/in-memory-live-query-store'
import { Disposable } from 'graphql-ws'
import { seed } from '@/seed/seed'
import * as Sentry from '@sentry/node'
import * as Tracing from '@sentry/tracing'
import { version } from '../package.json'

const validationRules = [...specifiedRules, NoLiveMixedWithDeferStreamRule]

const RESET = true // set TRUE to WIPE AND RESET DATABASE in dev

const shouldUseSentry =
  process.env.NODE_ENV === 'production' && process.env.SENTRY_DSN

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
    process.env.NODE_ENV === 'production'
      ? new RedisLiveQueryStore(process.env.REDIS_URL)
      : new InMemoryLiveQueryStore()
  const schema = await buildSchema(typeGraphQLConf)

  const app = express()

  if (shouldUseSentry) {
    Sentry.init({
      dsn: process.env.SENTRY_DSN,
      integrations: [
        // enable HTTP calls tracing
        new Sentry.Integrations.Http({ tracing: true }),
        // enable Express.js middleware tracing
        new Tracing.Integrations.Express({ app })
      ],
      release: `server@${version}`,

      // Set tracesSampleRate to 1.0 to capture 100%
      // of transactions for performance monitoring.
      // We recommend adjusting this value in production
      tracesSampleRate: 1.0
    })

    // RequestHandler creates a separate execution context using domains, so that every
    // transaction/span/breadcrumb is attached to its own Hub instance
    app.use(Sentry.Handlers.requestHandler())
    // TracingHandler creates a trace for every incoming request
    app.use(Sentry.Handlers.tracingHandler())
  }

  app.use(cors({ origin: true }))
  app.use(
    graphqlUploadExpress({
      maxFileSize: MAX_FILE_SIZE,
      maxFiles: 20
    })
  )
  const apolloServer = new ApolloServer({
    uploads: false,
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
  apolloServer.applyMiddleware({ app })

  if (shouldUseSentry) {
    app.get('/debug-sentry', function mainHandler(req, res) {
      ;(req as any).user = { username: 'test', email: 'test@test.com', id: '0' }
      throw new Error('My first Sentry error!')
    })

    // The error handler must be before any other error middleware and after all controllers
    app.use(Sentry.Handlers.errorHandler())

    // Optional fallthrough error handler
    app.use(function onError(err, req, res, next) {
      // The error id is attached to `res.sentry` to be returned
      // and optionally displayed to the user for support.
      res.statusCode = 500
      res.end(res.sentry + '\n')
    })
  }

  const port = +process.env.PORT || 4000

  let graphqlWs: Disposable
  const server = app.listen(port, () => {
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
        context: ({ connectionParams }) => {
          const user = getUserFromToken(connectionParams?.token as string)
          const em = orm.em.fork()
          return {
            em,
            liveQueryStore,
            userId: user?.id,
            loaders: createLoaders(em, user?.id)
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

  await seed(orm.em.fork())
}
