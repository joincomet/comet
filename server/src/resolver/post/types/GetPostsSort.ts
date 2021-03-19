import { registerEnumType } from 'type-graphql'

export enum GetPostsSort {
  New = 'NEW',
  Top = 'TOP',
  Hot = 'HOT'
}

registerEnumType(GetPostsSort, {
  name: 'GetPostsSort'
})
