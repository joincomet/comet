import { registerEnumType } from 'type-graphql'

export enum ChannelType {
  Public = 'Public',
  Restricted = 'Restricted',
  Private = 'Private'
}

registerEnumType(ChannelType, { name: 'ChannelType' })
