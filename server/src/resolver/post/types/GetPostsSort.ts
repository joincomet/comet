import { registerEnumType } from 'type-graphql'

export enum GetPostsSort {
  NEW,
  TOP,
  HOT
}

registerEnumType(GetPostsSort, {
  name: 'GetPostsSort'
})
