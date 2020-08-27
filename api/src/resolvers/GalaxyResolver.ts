import {
  Arg,
  Ctx,
  ID,
  Mutation,
  Query,
  Resolver,
  UseMiddleware
} from 'type-graphql'
import { Galaxy } from '../entities/Galaxy'
import { RepositoryInjector } from '../RepositoryInjector'
import { RequiresAuth } from '../middleware/RequiresAuth'
import { FileUpload, GraphQLUpload } from 'graphql-upload'
import { Context } from '../Context'
import { Stream } from 'stream'
import { s3upload } from '../S3Storage'
import { RequiresAdmin } from '../middleware/RequiresAdmin'
import { Planet } from '../entities/Planet'

@Resolver(() => Galaxy)
export class GalaxyResolver extends RepositoryInjector {
  @Query(() => Galaxy, { nullable: true })
  async galaxy(@Arg('galaxyName', () => ID) galaxyName: string) {
    return this.galaxyRepository
      .createQueryBuilder('galaxy')
      .where('galaxy.name = :galaxyName', { galaxyName })
      .loadRelationCountAndMap('galaxy.planetCount', 'galaxy.planets')
      .getOne()
  }

  @Query(() => [Galaxy])
  async galaxies() {
    return this.galaxyRepository
      .createQueryBuilder('galaxy')
      .loadRelationCountAndMap('galaxy.planetCount', 'galaxy.planets')
      .addOrderBy('galaxy.fullName', 'ASC')
      .getMany()
  }

  @Mutation((returns) => Boolean)
  @UseMiddleware(RequiresAdmin)
  async setGalaxyDescription(
    @Arg('galaxyName', () => ID) galaxyName: string,
    @Arg('description') description: string
  ) {
    await this.galaxyRepository.update(galaxyName, { description })
    return true
  }

  @Mutation(() => Boolean)
  @UseMiddleware(RequiresAdmin)
  async uploadGalaxyBannerImage(
    @Arg('file', () => GraphQLUpload) file: FileUpload,
    @Arg('galaxyName', () => ID) galaxyName: string
  ) {
    const { createReadStream, mimetype } = await file

    if (mimetype !== 'image/jpeg' && mimetype !== 'image/png')
      throw new Error('Image must be PNG or JPEG')

    const outStream = new Stream.PassThrough()
    createReadStream().pipe(outStream)

    const url = await s3upload(
      `galaxy/${galaxyName}/banner.png`,
      outStream,
      file.mimetype
    )

    await this.galaxyRepository.update(galaxyName, { bannerImageUrl: url })
    return true
  }
}
