import { Field, ObjectType } from 'type-graphql'
import { Embeddable, Property } from '@mikro-orm/core'

@Embeddable()
@ObjectType()
export class File {
  @Property({ columnType: 'text' })
  @Field()
  url: string

  @Property({ columnType: 'text' })
  @Field()
  mime: string

  @Property({ columnType: 'text' })
  @Field()
  filename: string

  @Property()
  @Field()
  size: number
}
