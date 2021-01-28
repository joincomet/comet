import { registerEnumType } from 'type-graphql'

export enum PostSort {
  NEW,
  TOP,
  HOT,
  COMMENTS
}

registerEnumType(PostSort, {
  name: 'PostSort'
})
