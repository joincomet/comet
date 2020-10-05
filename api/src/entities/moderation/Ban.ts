import { Field, ID, ObjectType } from 'type-graphql'
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import { Lazy } from '@/Lazy'
import { User } from '@/entities/User'
import { Post } from '../Post'
import { Community } from '@/entities/Community'

@ObjectType()
@Entity()
export class Ban {
  @Field(() => ID)
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  readonly id: number

  @ManyToOne(() => User)
  mod: Lazy<User>

  @Field(() => ID)
  @Column('bigint')
  modId: number

  @ManyToOne(() => User, user => user.bans)
  user: Lazy<User>

  @Field(() => ID)
  @Column('bigint')
  userId: number

  @ManyToOne(() => Community, community => community.bans, { nullable: true })
  community?: Lazy<User> // null = sitewide ban

  @Field(() => ID, { nullable: true })
  @Column('bigint', { nullable: true })
  communityId?: number

  @Field({ nullable: true })
  @Column({ nullable: true })
  duration?: number // null = permanent

  @Field()
  get expired(): boolean {
    if (!this.duration || this.duration <= 0) return false
    return new Date().getTime() - this.createdAt.getTime() > this.duration
  }

  @Field()
  @Column()
  reason: string

  @Field()
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date

  @Field()
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date
}
