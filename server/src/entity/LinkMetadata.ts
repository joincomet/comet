import { Field, ObjectType } from 'type-graphql'
import { Embeddable, Property } from '@mikro-orm/core'

@Embeddable()
@ObjectType()
export class LinkMetadata {
  @Property({ nullable: true, columnType: 'text' })
  @Field({ nullable: true })
  title?: string

  @Property({ nullable: true, columnType: 'text' })
  @Field({ nullable: true })
  description?: string

  @Property({ nullable: true })
  @Field({ nullable: true })
  date?: Date

  @Property({ nullable: true, columnType: 'text' })
  @Field({ nullable: true })
  author?: string

  @Property({ nullable: true, columnType: 'text' })
  @Field({ nullable: true })
  publisher?: string

  @Property({ nullable: true, columnType: 'text' })
  @Field({ nullable: true })
  image?: string

  @Property({ nullable: true, columnType: 'text' })
  @Field({ nullable: true })
  logo?: string

  @Property({ nullable: true, columnType: 'text' })
  @Field({ nullable: true })
  url?: string

  @Property({ nullable: true, columnType: 'text' })
  @Field({ nullable: true })
  twitterCard?: string
}
