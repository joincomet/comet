import { registerEnumType } from 'type-graphql'

export enum GetPublicServersSort {
  New = 'New',
  Top = 'Top',
  Featured = 'Featured'
}

registerEnumType(GetPublicServersSort, {
  name: 'GetPublicServersSort'
})
