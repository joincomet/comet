import * as TypeORM from 'typeorm'
import { Container } from 'typedi'
import fs from 'fs'
import path from 'path'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'
import { getRepository } from 'typeorm'
import { Community } from '@/entities/Community'

TypeORM.useContainer(Container)

const deleteUnusedCommunities = async () => {
  try {
    await TypeORM.createConnection({
      type: 'postgres',
      username:
        process.env.NODE_ENV === 'production'
          ? process.env.DB_USERNAME
          : 'postgres',
      password:
        process.env.NODE_ENV === 'production'
          ? process.env.DB_PASSWORD
          : 'password',
      host:
        process.env.NODE_ENV === 'production'
          ? process.env.DB_HOST
          : 'postgres',
      port:
        process.env.NODE_ENV === 'production'
          ? parseInt(process.env.DB_PORT)
          : 5432,
      database:
        process.env.NODE_ENV === 'production'
          ? process.env.DB_DATABASE
          : 'postgres',
      // url: process.env.NODE_ENV === 'production' ? process.env.DATABASE_URL : 'postgresql://postgres:password@postgres:5432/postgres',
      entities: ['../entities/**/*.{ts,js}'],
      synchronize: true,
      logging: process.env.NODE_ENV !== 'production',
      dropSchema: false, // CLEARS DATABASE ON START
      cache: true,
      ssl:
        process.env.NODE_ENV === 'production'
          ? {
              ca: fs.readFileSync(path.resolve('../../ca-certificate.crt'), {
                encoding: 'utf8'
              })
            }
          : undefined,
      namingStrategy: new SnakeNamingStrategy()
    })
  } catch (e) {
    console.error(e)
  }

  const communityRepo = getRepository<Community>(Community)
  const communitiesToDelete = (
    await communityRepo
      .createQueryBuilder('community')
      .loadRelationCountAndMap('community.postCount', 'community.posts')
      .getMany()
  )
    .filter(c => c.postCount === 0)
    .map(c => c.id)
  await communityRepo.delete(communitiesToDelete)
}

deleteUnusedCommunities()
