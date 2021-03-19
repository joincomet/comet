import { registerEnumType } from 'type-graphql'

export enum GetCommentsSort {
  New = 'NEW',
  Top = 'TOP'
}

registerEnumType(GetCommentsSort, {
  name: 'GetCommentsSort'
})
