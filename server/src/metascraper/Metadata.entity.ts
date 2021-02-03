import { Field, ObjectType } from 'type-graphql'
import { Embeddable, Property } from '@mikro-orm/core'

@Embeddable()
@ObjectType()
export class Metadata {
  @Property({ nullable: true })
  @Field({ nullable: true })
  title?: string

  @Property({ nullable: true })
  @Field({ nullable: true })
  description?: string

  @Property({ nullable: true })
  @Field({ nullable: true })
  date?: string

  @Property({ nullable: true })
  @Field({ nullable: true })
  author?: string

  @Property({ nullable: true })
  @Field({ nullable: true })
  publisher?: string

  @Property({ nullable: true })
  @Field({ nullable: true })
  image?: string

  @Property({ nullable: true })
  @Field({ nullable: true })
  logo?: string

  @Property({ nullable: true })
  @Field({ nullable: true })
  url?: string

  @Property({ nullable: true })
  @Field({ nullable: true })
  twitterCard?: string
}
