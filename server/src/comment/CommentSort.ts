import { registerEnumType } from 'type-graphql'

export enum CommentSort {
  NEW,
  TOP
}

registerEnumType(CommentSort, {
  name: 'CommentSort'
})
