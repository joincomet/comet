import { Entity, ManyToOne, PrimaryKeyType, Property } from '@mikro-orm/core'
import { Folder, Post, User } from '@/entity'

@Entity()
export class FolderPost {
  @ManyToOne({ entity: () => Post, primary: true })
  post: Post

  @ManyToOne({ entity: () => Folder, primary: true })
  folder: Folder

  @ManyToOne({ entity: () => User, primary: true })
  addedByUser: User;

  [PrimaryKeyType]: [string, string]

  @Property()
  addedAt: Date = new Date()
}
