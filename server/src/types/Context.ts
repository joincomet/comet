import { EntityManager } from '@mikro-orm/postgresql'
import { Request, Response } from 'express'
import { User } from '@/user/User.entity'

export interface Context {
  em: EntityManager
  req: Request
  res: Response
  user: User
}
