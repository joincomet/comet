import { registerEnumType } from 'type-graphql'

export enum PostSort {
  NEW,
  TOP,
  HOT
}

registerEnumType(PostSort, {
  name: 'PostSort'
})
