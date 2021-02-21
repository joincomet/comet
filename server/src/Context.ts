import { EntityManager } from '@mikro-orm/postgresql'
import { Request, Response } from 'express'

export interface Context {
  em: EntityManager
  req: Request
  res: Response
  userId: string
  /*userLoader: DataLoader<string, User>
  postLoader: DataLoader<string, Post>
  commentLoader: DataLoader<string, Comment>*/
}
