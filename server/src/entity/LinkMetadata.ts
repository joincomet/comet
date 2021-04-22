import { Field, ObjectType } from 'type-graphql'
import { Embeddable, Property } from '@mikro-orm/core'
import { GraphQLURL } from 'graphql-scalars'
import { isUrl } from '@/util'
import { URL } from 'url'

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
  @Field(() => GraphQLURL, { nullable: true })
  image?: string

  @Property({ nullable: true, columnType: 'text' })
  @Field(() => GraphQLURL, { nullable: true })
  logo?: string

  @Property({ nullable: true, columnType: 'text' })
  @Field(() => GraphQLURL, { nullable: true })
  url?: string

  @Field({ nullable: true })
  get domain(): string | null {
    if (isUrl(this.url)) {
      let domain = new URL(this.url).hostname
      if (domain.startsWith('www.')) domain = domain.substring(4)
      return domain
    }
    return null
  }

  @Property({ nullable: true, columnType: 'text' })
  @Field({ nullable: true })
  twitterCard?: string
}
