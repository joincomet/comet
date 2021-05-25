import { Field, ObjectType } from 'type-graphql'
import { Embeddable, Embedded, Property } from '@mikro-orm/core'
import { URL } from 'url'
import isURL from 'validator/lib/isURL'
import { Image } from '@/entity/Image'

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
  imageUrl?: string

  @Field(() => Image, { nullable: true })
  @Embedded(() => Image, { object: true, nullable: true })
  image?: Image

  @Property({ nullable: true, columnType: 'text' })
  @Field({ nullable: true })
  logoUrl?: string

  @Field(() => Image, { nullable: true })
  @Embedded(() => Image, { object: true, nullable: true })
  logo?: Image

  @Property({ nullable: true, columnType: 'text' })
  @Field({ nullable: true })
  url?: string

  @Field({ nullable: true })
  get domain(): string | null {
    if (isURL(this.url)) {
      let domain = new URL(this.url).hostname
      if (domain.startsWith('www.')) domain = domain.substring(4)
      return domain
    }
    return null
  }

  @Property({ nullable: true, columnType: 'text' })
  @Field({ nullable: true })
  twitterCard?: string

  @Property({ nullable: true, columnType: 'text' })
  @Field({ nullable: true })
  themeColor?: string
}
