import { ApolloLink, Operation, FetchResult, Observable } from '@apollo/client'
import { print } from 'graphql'
import { Subscription, SubscriptionOptions } from 'sse-z'

export class SSELink extends ApolloLink {
  options: SubscriptionOptions

  constructor(options: SubscriptionOptions) {
    super()
    this.options = options
  }

  public request({
    query,
    variables,
    operationName
  }: Operation): Observable<FetchResult> {
    return new Observable(sink => {
      const subscription = new Subscription({
        ...this.options,
        searchParams: {
          query: print(query),
          variables: JSON.stringify(variables),
          operationName
        },
        onNext: data => {
          sink.next(JSON.parse(data))
        }
      })

      return () => subscription.unsubscribe()
    })
  }
}
