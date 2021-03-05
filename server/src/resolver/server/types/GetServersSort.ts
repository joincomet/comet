import { registerEnumType } from 'type-graphql'

export enum GetServersSort {
  NEW,
  TOP,
  AZ,
  FEATURED
}

registerEnumType(GetServersSort, {
  name: 'GetServersSort'
})
