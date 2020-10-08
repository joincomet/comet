import { Field, ID, ObjectType } from 'type-graphql'
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn
} from 'typeorm'
import { Lazy } from '@/Lazy'
import { User } from '@/entities/User'
import { Community } from '@/entities/Community'
import { ModPermission } from '@/types/community/ModPermission'

@ObjectType()
@Entity()
export class CommunityModerator {
  @ManyToOne(() => User, user => user.moderatedCommunities)
  user: Lazy<User>

  @Field(() => ID)
  @PrimaryColumn('bigint')
  userId: number

  @ManyToOne(() => Community, community => community.moderators, {
    onDelete: 'CASCADE'
  })
  community: Lazy<Community>

  @Field(() => ID)
  @PrimaryColumn('bigint')
  communityId: number

  @Field()
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date

  @Field(() => [ModPermission], { nullable: true })
  @Column({
    type: 'enum',
    enum: ModPermission,
    array: true,
    nullable: true // null = all permissions
  })
  permissions?: ModPermission[]
}
