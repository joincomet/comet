import { GraphiQL as DefaultGraphiQL } from 'graphiql'
import 'graphiql/graphiql.css'
import { meros } from 'meros/browser'
import { Subscription as SSESubscription } from 'sse-z'
import { isLiveQueryOperationDefinitionNode } from '@n1ru4l/graphql-live-query'
import {
  makeAsyncIterableIteratorFromSink,
  isAsyncIterable
} from '@n1ru4l/push-pull-async-iterable-iterator'
import { parse, getOperationAST, specifiedRules } from 'graphql'
import { NoLiveMixedWithDeferStreamRule } from '@n1ru4l/graphql-live-query'

const httpMultipartFetcher = async (graphQLParams, { headers }) => {
  const abortController = new AbortController()

  const parsedDocument = parse(graphQLParams.query)
  const operationName = graphQLParams.operationName
  const documentNode = getOperationAST(parsedDocument, operationName)
  if (
    documentNode.operation === 'subscription' ||
    isLiveQueryOperationDefinitionNode(documentNode)
  ) {
    const searchParams = {
      operationName: graphQLParams.operationName,
      query: graphQLParams.query
    }
    if (graphQLParams.variables) {
      searchParams.variables = JSON.stringify(graphQLParams.variables)
    }

    return makeAsyncIterableIteratorFromSink(sink => {
      const subscription = new SSESubscription({
        url: 'http://localhost:4000/graphql',
        searchParams,
        eventSourceOptions: {
          // Ensure cookies are included with the request
          withCredentials: true,
          headers
        },
        onNext: value => {
          sink.next(JSON.parse(value))
        },
        onError: sink.error,
        onComplete: sink.complete
      })

      return () => subscription.unsubscribe()
    })
  }

  const patches = await fetch('http://localhost:4000/graphql', {
    method: 'POST',
    body: JSON.stringify(graphQLParams),
    headers: {
      accept: 'application/json, multipart/mixed',
      'content-type': 'application/json',
      ...headers
    },
    signal: abortController.signal
  }).then(r => meros(r))

  if (isAsyncIterable(patches)) {
    return multiResponseParser(patches)
  }

  return patches.json()
}

async function* multiResponseParser(iterator) {
  for await (const { body, json } of iterator) {
    if (!json) {
      throw new Error('failed parsing part as json')
    }
    yield body
  }
}

export const GraphiQL = () => {
  return (
    <div style={{ height: '100vh' }}>
      <DefaultGraphiQL
        headerEditorEnabled
        shouldPersistHeaders
        defaultQuery={``}
        validationRules={[...specifiedRules, NoLiveMixedWithDeferStreamRule]}
        fetcher={httpMultipartFetcher}
      />
    </div>
  )
}
