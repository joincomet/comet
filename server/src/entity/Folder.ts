import { Field, ObjectType } from 'type-graphql'
import { Post, User, BaseEntity } from '@/entity'
import {
  Collection,
  Entity,
  ManyToMany,
  ManyToOne,
  Property
} from '@mikro-orm/core'

@ObjectType({ implements: BaseEntity })
@Entity()
export class Folder extends BaseEntity {
  @Field()
  @Property({ columnType: 'text' })
  name: string

  @Field({ nullable: true })
  @Property({ nullable: true, columnType: 'text' })
  description?: string

  @Field({ nullable: true })
  @Property({ nullable: true, columnType: 'text' })
  avatarUrl?: string

  @ManyToMany(() => Post)
  posts = new Collection<Post>(this)

  @ManyToOne(() => User, { nullable: true })
  owner?: User

  @Property()
  isDeleted: boolean = false

  @Property({ nullable: true })
  updatedAt?: Date

  @Property()
  isCollaborative: boolean = false
}
