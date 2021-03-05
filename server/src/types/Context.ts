import { EntityManager } from '@mikro-orm/postgresql'
import { User } from '@/entity/User'

export interface Context {
  em: EntityManager
  user: User
}
