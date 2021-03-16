import { createUnionType } from 'type-graphql'
import { Group, User } from '@/entity'

export const GroupDmUnion = createUnionType({
  name: 'GroupDmUnion',
  types: () => [Group, User] as const
})
