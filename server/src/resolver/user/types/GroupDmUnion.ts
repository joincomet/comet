import { createUnionType } from 'type-graphql'
import { ChatGroup, DirectMessage } from '@/entity'

export const GroupDmUnion = createUnionType({
  name: 'GroupDmUnion',
  types: () => [ChatGroup, DirectMessage] as const
})
