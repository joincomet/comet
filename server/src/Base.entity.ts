import { Field, ID, InterfaceType } from 'type-graphql'
import { BigIntType, PrimaryKey, Property } from '@mikro-orm/core'

@InterfaceType()
export abstract class BaseEntity {
  @Field(() => ID)
  @PrimaryKey({ type: BigIntType })
  id!: string

  @Field()
  @Property()
  createdAt: Date = new Date()
}
