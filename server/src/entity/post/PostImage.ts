import { Field, ObjectType } from 'type-graphql'
import { Embeddable, Embedded, Property } from '@mikro-orm/core'
import { Image } from '@/entity'

@Embeddable()
@ObjectType()
export class PostImage {
  @Field(() => Image)
  @Embedded({ entity: () => Image, object: true })
  image: Image

  @Property({ nullable: true, columnType: 'text' })
  @Field({ nullable: true })
  linkUrl?: string

  @Property({ nullable: true, columnType: 'text' })
  @Field({ nullable: true })
  caption?: string
}
