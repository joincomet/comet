import {
  Entity,
  Enum,
  ManyToOne,
  PrimaryKeyType,
  Property
} from '@mikro-orm/core'
import { Comment, User, VoteType } from '@/entity'
import { Field } from 'type-graphql'

@Entity()
export class CommentVote {
  @ManyToOne({ entity: () => User, primary: true })
  user: User

  @ManyToOne({ entity: () => Comment, primary: true })
  comment: Comment;

  [PrimaryKeyType]: [string, string]

  @Property()
  createdAt: Date = new Date()

  @Field(() => VoteType)
  @Enum({
    items: () => VoteType
  })
  type: VoteType = VoteType.None
}
