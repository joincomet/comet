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
import { Planet } from '@/entities/Planet'
import { ModPermission } from '@/types/planet/ModPermission'

@ObjectType()
@Entity()
export class PlanetModerator {
  @ManyToOne(() => User, user => user.moderatedPlanets)
  user: Lazy<User>

  @Field(() => ID)
  @PrimaryColumn('bigint')
  userId: number

  @ManyToOne(() => Planet, planet => planet.moderators, {
    onDelete: 'CASCADE'
  })
  planet: Lazy<Planet>

  @Field(() => ID)
  @PrimaryColumn('bigint')
  planetId: number

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
