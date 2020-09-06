import { Field, ID, ObjectType } from 'type-graphql'
import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm'
import { Comment } from '@/entities/Comment'
import { Lazy } from '@/lazy'
import { User } from '@/entities/User'
import { PostEndorsement } from '@/entities/PostEndorsement'
import { PostView } from '@/entities/PostView'
import { Planet } from '@/entities/Planet'

export enum PostType {
  TEXT = 'TEXT',
  LINK = 'LINK',
  IMAGE = 'IMAGE'
}

@ObjectType()
@Entity()
export class Post {
  @Field(() => ID)
  @PrimaryColumn('varchar', { length: 20 })
  id: string

  @Field()
  @Column()
  title: string

  @Field(() => String, { nullable: true })
  @Column('text', { nullable: true })
  textContent?: string

  @Field({ nullable: true })
  @Column({ nullable: true })
  link?: string

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User, (user) => user.posts)
  author: Lazy<User>

  @Field(() => ID)
  @Column({ nullable: true })
  authorId: string

  @Field(() => PostType)
  @Column({
    type: 'enum',
    enum: PostType
  })
  type: PostType

  @Field()
  @Column()
  createdAt: Date

  @Field()
  timeSince: string

  @Field({ nullable: true })
  @Column({ nullable: true })
  editedAt?: Date

  @Field({ nullable: true })
  editedTimeSince: string

  @Field()
  @Column({ default: false })
  sticky: boolean

  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Lazy<Comment[]>

  @Field()
  @Column({ default: 0 })
  commentCount: number

  @Field(() => Planet, { nullable: true })
  @ManyToOne(() => Planet, (planet) => planet.posts, {
    cascade: true,
    nullable: true
  })
  planet: Lazy<Planet>

  @Field(() => ID, { nullable: true })
  @Column({ nullable: true })
  planetName: string

  @Field()
  @Column({ default: false })
  postedToProfile: boolean

  @OneToMany(() => PostEndorsement, (endorsement) => endorsement.post)
  endorsements: Lazy<PostEndorsement[]>

  @Field()
  @Column({ default: 0 })
  endorsementCount: number

  personalEndorsementCount = 0

  @OneToMany(() => PostView, (postView) => postView.post)
  postViews: Lazy<PostView[]>

  @Field()
  newCommentCount: number

  @Field()
  isEndorsed: boolean

  @Field({ nullable: true })
  @Column({ nullable: true })
  thumbnailUrl?: string

  @Field({ nullable: true })
  @Column({ nullable: true })
  domain?: string

  @Column({ default: false })
  deleted: boolean

  @Column({ default: false })
  removed: boolean

  @Column({ nullable: true })
  removedReason?: string

  @Field({ nullable: true })
  postView: PostView

  @Field()
  isHidden: boolean

  @Field()
  relativeUrl: string
}
