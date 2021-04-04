import { Field, ObjectType } from 'type-graphql'
import { BaseEntity, Post, User } from '@/entity'
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

  @ManyToMany(() => Post, 'folders', { owner: true })
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
