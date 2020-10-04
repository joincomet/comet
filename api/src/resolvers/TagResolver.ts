import { Arg, Query, Resolver } from 'type-graphql'
import { Tag } from '@/entities/Tag'
import { InjectRepository } from 'typeorm-typedi-extensions'
import { Repository } from 'typeorm'

@Resolver(() => Tag)
export class TagResolver {
  @InjectRepository(Tag)
  readonly tagRepository: Repository<Tag>

  @Query(() => Tag, { nullable: true })
  async tag(@Arg('name') name: string) {
    console.log('y')
    return this.tagRepository
      .createQueryBuilder('tag')
      .where('tag.name ILIKE :name', {
        name: name.replace(/_/g, '\\_')
      })
      .getOne()
  }
}
