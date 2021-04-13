import { registerEnumType } from 'type-graphql'

export enum ServerUserStatus {
  None = 'None',
  Joined = 'Joined',
  Banned = 'Banned'
}

registerEnumType(ServerUserStatus, { name: 'ServerUserStatus' })
