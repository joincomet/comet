import { createUnionType } from 'type-graphql'
import { Group, DirectMessage } from '@/entity'

export const GroupDmUnion = createUnionType({
  name: 'GroupDmUnion',
  types: () => [Group, DirectMessage] as const
})
