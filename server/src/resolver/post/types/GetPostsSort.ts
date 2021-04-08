import { registerEnumType } from 'type-graphql'

export enum GetPostsSort {
  New = 'New',
  Top = 'Top',
  Hot = 'Hot',
  Added = 'Added'
}

registerEnumType(GetPostsSort, {
  name: 'GetPostsSort'
})
