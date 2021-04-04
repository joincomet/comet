import { Field, Int, ObjectType } from 'type-graphql'
import { Embeddable, Property } from '@mikro-orm/core'

@Embeddable()
@ObjectType()
export class Image {
  @Property({ columnType: 'text' })
  @Field()
  originalUrl: string

  @Property({ columnType: 'text' })
  @Field()
  smallUrl: string

  @Property()
  @Field(() => Int)
  smallWidth: number // max = 400px

  @Property()
  @Field(() => Int)
  smallHeight: number // max = 300px

  @Property({ columnType: 'text' })
  @Field()
  popupUrl: string

  @Property()
  @Field(() => Int)
  popupWidth: number // max = 1440px

  @Property()
  @Field(() => Int)
  popupHeight: number // max = 630px
}
