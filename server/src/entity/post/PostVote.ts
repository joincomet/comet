import {
  Entity,
  Enum,
  ManyToOne,
  PrimaryKeyType,
  Property
} from '@mikro-orm/core'
import { Post, User, VoteType } from '@/entity'
import { Field } from 'type-graphql'

@Entity()
export class PostVote {
  @ManyToOne({ entity: () => User, primary: true })
  user: User

  @ManyToOne({ entity: () => Post, primary: true })
  post: Post;

  [PrimaryKeyType]: [string, string]

  @Property()
  createdAt: Date = new Date()

  @Field(() => VoteType)
  @Enum({
    items: () => VoteType
  })
  type: VoteType = VoteType.None
}
