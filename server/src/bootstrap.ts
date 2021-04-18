import { MikroORM } from '@mikro-orm/core'
import { mikroOrmConf } from '@/config/mikroOrm'
import { buildSchema } from 'type-graphql'
import { typeGraphQLConf } from '@/config/typeGraphQL'
import express from 'express'
import { specifiedRules } from 'graphql'
import { NoLiveMixedWithDeferStreamRule } from '@n1ru4l/graphql-live-query'
import { getGraphQLParameters, processRequest } from 'graphql-helix'
import { InMemoryLiveQueryStore } from '@n1ru4l/in-memory-live-query-store'
import { graphqlUploadExpress } from 'graphql-upload'
import { getUserId } from '@/util'
import { User } from '@/entity'
import { Context } from '@/types'
import { seed } from '@/seed'
import { writeSchemaJson } from '@/writeSchemaJson'
import { createLoaders } from '@/util/loaders/createLoaders'
import cors from 'cors'
import cookieParser from 'cookie-parser'

export async function bootstrap() {
  console.log(`Initializing database connection...`)
  const orm = await MikroORM.init(mikroOrmConf)

  // TODO don't seed in production
  // if (process.env.NODE_ENV !== 'production') {
  console.log(`Setting up the database...`)
  const generator = orm.getSchemaGenerator()
  // await generator.dropSchema(false)
  // await generator.createSchema(false)
  await generator.updateSchema(false)

  //await seed(orm.em.fork())
  // }

  console.log(`Bootstraping schema and server...`)
  const liveQueryStore = new InMemoryLiveQueryStore()
  const schema = await buildSchema(typeGraphQLConf)

  const app = express()
  app.use(cookieParser())
  app.use(cors({ origin: true, credentials: true }))
  app.use(express.json())
  app.use(
    '/graphql',
    graphqlUploadExpress({
      maxFileSize: 8 * 1024 * 1024, // 8MB limit
      maxFiles: 10
    }),
    async (req, res) => {
      const request = {
        body: req.body,
        headers: req.headers,
        method: req.method,
        query: req.query
      }
      const { operationName, query, variables } = getGraphQLParameters(request)

      const result = await processRequest({
        operationName,
        query,
        variables,
        request,
        schema,
        validationRules: [...specifiedRules, NoLiveMixedWithDeferStreamRule],
        contextFactory: async () => {
          const em = orm.em.fork()
          const userId = getUserId(
            (req.cookies.token || request.headers.token) as string
          )
          const user: User = userId ? await em.findOne(User, userId) : null
          return {
            em,
            user,
            liveQueryStore,
            req,
            res,
            loaders: createLoaders(em, user)
          } as Context
        },
        execute: liveQueryStore.execute
      })

      if (result.type === 'RESPONSE') {
        result.headers.forEach(({ name, value }) => res.setHeader(name, value))
        res.status(result.status)
        res.json(result.payload)
      } else if (result.type === 'MULTIPART_RESPONSE') {
        res.writeHead(200, {
          Connection: 'keep-alive',
          'Content-Type': 'multipart/mixed; boundary="-"',
          'Transfer-Encoding': 'chunked'
        })

        req.on('close', () => {
          result.unsubscribe()
        })

        await result.subscribe(result => {
          const chunk = Buffer.from(JSON.stringify(result), 'utf8')
          const data = [
            '',
            '---',
            'Content-Type: application/json; charset=utf-8',
            'Content-Length: ' + String(chunk.length),
            '',
            chunk,
            ''
          ].join('\r\n')
          res.write(data)
        })

        res.write('\r\n-----\r\n')
        res.end()
      } else {
        res.writeHead(200, {
          'Content-Type': 'text/event-stream',
          Connection: 'keep-alive',
          'Cache-Control': 'no-cache'
        })

        req.on('close', () => {
          result.unsubscribe()
        })

        await result.subscribe(result => {
          res.write(`data: ${JSON.stringify(result)}\n\n`)
        })
      }
    }
  )

  const port = process.env.PORT || 4000

  app.listen(port, () => {
    console.log(`GraphQL server is running on port ${port}.`)
  })

  if (process.env.NODE_ENV !== 'production') writeSchemaJson()
}
