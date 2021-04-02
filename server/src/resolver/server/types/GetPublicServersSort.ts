import { registerEnumType } from 'type-graphql'

export enum GetPublicServersSort {
  New = 'NEW',
  Top = 'TOP',
  AZ = 'AZ',
  Featured = 'FEATURED'
}

registerEnumType(GetPublicServersSort, {
  name: 'GetPublicServersSort'
})
