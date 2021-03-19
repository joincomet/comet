import { registerEnumType } from 'type-graphql'

export enum GetServersSort {
  New = 'NEW',
  Top = 'TOP',
  AZ = 'AZ',
  Featured = 'FEATURED'
}

registerEnumType(GetServersSort, {
  name: 'GetServersSort'
})
