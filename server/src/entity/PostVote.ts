import { Entity, ManyToOne, PrimaryKeyType, Property } from '@mikro-orm/core'
import { BaseEntity, Post, User } from '@/entity'

@Entity()
export class PostVote {
  @ManyToOne({ entity: () => User, primary: true })
  user: User

  @ManyToOne({ entity: () => Post, primary: true })
  post: Post;

  [PrimaryKeyType]: [string, string]

  @Property()
  createdAt: Date = new Date()
}
