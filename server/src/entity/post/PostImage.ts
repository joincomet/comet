import { Field, ObjectType } from 'type-graphql'
import { Embeddable, Property } from '@mikro-orm/core'
import { GraphQLURL } from 'graphql-scalars'

@Embeddable()
@ObjectType()
export class PostImage {
  @Property({ columnType: 'text' })
  @Field()
  url: string

  @Property({ nullable: true, columnType: 'text' })
  @Field({ nullable: true })
  linkUrl?: string

  @Property({ nullable: true, columnType: 'text' })
  @Field({ nullable: true })
  caption?: string
}
