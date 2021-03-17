import { Channel, User, BaseEntity, Message } from '@/entity'
import { Field, ObjectType } from 'type-graphql'
import {
  Collection,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  Property
} from '@mikro-orm/core'

@ObjectType({ implements: BaseEntity })
@Entity()
export class Group extends BaseEntity {
  @Field(() => User)
  @ManyToOne(() => User)
  owner: User

  @Field()
  @Property({ columnType: 'text' })
  name: string

  @Field({ nullable: true })
  @Property({ nullable: true, columnType: 'text' })
  avatarUrl: string

  @Field()
  @Property()
  lastMessageAt: Date = new Date()

  @Field(() => [User])
  @ManyToMany(() => User, 'groups', { owner: true })
  users = new Collection<User>(this)

  @OneToMany(() => Message, 'group')
  messages = new Collection<Message>(this)

  @Field()
  get displayName(): string {
    if (this.name) return this.name
    if (this.users.isInitialized())
      return this.users
        .getItems()
        .map(u => u.name)
        .join(', ')
    return this.id
  }
}
