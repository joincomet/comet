import { registerEnumType } from 'type-graphql'

export enum ServerSort {
  NEW,
  TOP,
  AZ,
  FEATURED
}

registerEnumType(ServerSort, {
  name: 'serverSort'
})
