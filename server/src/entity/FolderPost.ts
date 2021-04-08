import { Entity, ManyToOne, PrimaryKeyType, Property } from '@mikro-orm/core'
import { Folder, Post } from '@/entity'

@Entity()
export class FolderPost {
  @ManyToOne({ entity: () => Post, primary: true })
  post: Post

  @ManyToOne({ entity: () => Folder, primary: true })
  folder: Folder;

  [PrimaryKeyType]: [string, string]

  @Property()
  addedAt: Date = new Date()
}
