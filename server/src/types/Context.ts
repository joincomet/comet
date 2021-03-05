import { EntityManager } from '@mikro-orm/postgresql'
import { User } from '@/entity'

export interface Context {
  em: EntityManager
  user: User
}
