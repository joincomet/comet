import { Field, ID, ObjectType } from 'type-graphql'
import {
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn
} from 'typeorm'
import { Lazy } from '@/Lazy'
import { User } from '@/user/User.Entity'
import { Planet } from '@/planet/Planet.Entity'

@ObjectType()
@Entity()
export class PlanetUser {
  @ManyToOne(() => User, user => user.planets)
  user: Lazy<User>

  @Field(() => ID)
  @PrimaryColumn('bigint')
  userId: number

  @ManyToOne(() => Planet, planet => planet.users, {
    onDelete: 'CASCADE'
  })
  planet: Lazy<Planet>

  @Field(() => ID)
  @PrimaryColumn('bigint')
  planetId: number

  @Field()
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date

  @Field()
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date
}
