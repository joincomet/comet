import { MikroORM } from '@mikro-orm/core'
import { mikroOrmConf } from '@/config/mikro-orm.config'
import { buildSchema } from 'type-graphql'
import { typeGraphQLConf } from '@/config/typegraphql.config'
import express from 'express'
import {ApolloError, ApolloServer} from 'apollo-server-express'
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
import { version } from '../package.json'

const validationRules = [...specifiedRules, NoLiveMixedWithDeferStreamRule]

const RESET = false // set TRUE to WIPE AND RESET DATABASE in dev

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
    process.env.NODE_ENV === 'production' && process.env.REDIS_URL
      ? new RedisLiveQueryStore(process.env.REDIS_URL)
      : new InMemoryLiveQueryStore()
  const schema = await buildSchema(typeGraphQLConf)

  const app = express()

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
    },
    plugins: shouldUseSentry ? [
      {
        requestDidStart(_) {
          /* Within this returned object, define functions that respond
             to request-specific lifecycle events. */
          return {
            didEncounterErrors(ctx) {
              // If we couldn't parse the operation, don't
              // do anything here
              if (!ctx.operation) {
                return;
              }

              for (const err of ctx.errors) {
                // Only report internal server errors,
                // all errors extending ApolloError should be user-facing
                if (err instanceof ApolloError) {
                  continue;
                }

                // Add scoped report details and send to Sentry
                Sentry.withScope(scope => {
                  // Annotate whether failing operation was query/mutation/subscription
                  scope.setTag("kind", ctx.operation.operation);

                  // Log query and variables as extras (make sure to strip out sensitive data!)
                  scope.setExtra("query", ctx.request.query);
                  scope.setExtra("variables", ctx.request.variables);

                  if (err.path) {
                    // We can also add the path as breadcrumb
                    scope.addBreadcrumb({
                      category: "query-path",
                      message: err.path.join(" > "),
                      level: Sentry.Severity.Debug
                    });
                  }

                  const transactionId = ctx.request.http.headers.get(
                    "x-transaction-id"
                  );
                  if (transactionId) {
                    scope.setTransactionName(transactionId);
                  }

                  Sentry.captureException(err);
                });
              }
            }
          };
        }
      }
    ] : []
  })
  apolloServer.applyMiddleware({ app })

  if (shouldUseSentry) {
    Sentry.init({
      dsn: process.env.SENTRY_DSN,
      release: `server@${version}`,
      tracesSampleRate: 1.0
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
