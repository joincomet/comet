import { registerEnumType } from 'type-graphql'

export enum VoteType {
  Up = 'Up',
  None = 'None',
  Down = 'Down'
}

registerEnumType(VoteType, { name: 'VoteType' })
