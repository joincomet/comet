import { registerEnumType } from 'type-graphql'

export enum GetCommentsSort {
  NEW,
  TOP
}

registerEnumType(GetCommentsSort, {
  name: 'GetCommentsSort'
})
