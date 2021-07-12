import { ApolloLink, Operation, FetchResult, Observable } from '@apollo/client'
import { print } from 'graphql'
import { createClient, Client } from 'graphql-ws'
import {
  makeAsyncIterableIteratorFromSink,
  applyAsyncIterableIteratorToSink
} from '@n1ru4l/push-pull-async-iterable-iterator'
import { applyLiveQueryJSONPatch } from '@n1ru4l/graphql-live-query-patch-json-patch'

export const wsStatus = {
  status: 'connecting'
}

const wsUrl = import.meta.env.PROD
  ? `wss://${import.meta.env.VITE_API_DOMAIN}/graphql`
  : 'ws://localhost:4000/graphql'

export class WebSocketLink extends ApolloLink {
  private client: Client

  constructor() {
    super()
    this.client = createClient({
      url: wsUrl,
      lazy: false,
      connectionParams: () => {
        const token = localStorage.getItem('token')
        if (!token) {
          return {}
        }
        return {
          token
        }
      },
      on: {
        connected: () => {
          wsStatus.status = 'connected'
        },
        error: () => {
          wsStatus.status = 'error'
        },
        closed: () => {
          wsStatus.status = 'closed'
        },
        connecting: () => {
          wsStatus.status = 'connecting'
        }
      }
    })
  }

  wsFetcher(graphQLParams: {
    query: string
    operationName: string
    variables?: any
  }) {
    return makeAsyncIterableIteratorFromSink<any>(sink =>
      this.client.subscribe(graphQLParams, sink)
    )
  }

  public request(operation: Operation): Observable<FetchResult> | null {
    return new Observable<FetchResult>(sink =>
      applyAsyncIterableIteratorToSink(
        applyLiveQueryJSONPatch(
          this.wsFetcher({
            operationName: operation.operationName,
            query: print(operation.query),
            variables: operation.variables
          })
        ),
        sink
      )
    )
  }
}
