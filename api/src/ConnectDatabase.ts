import * as TypeORM from 'typeorm'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'

export const connectDatabase = async (
  synchronize = true,
  logging: boolean = process.env.NODE_ENV !== 'production'
) => {
  try {
    return TypeORM.createConnection({
      type: 'postgres',
      url:
        process.env.NODE_ENV === 'production'
          ? process.env.DATABASE_URL
          : 'postgresql://postgres:password@postgres:5432/postgres',
      ssl:
        process.env.NODE_ENV === 'production'
          ? { ca: process.env.CA_CERT }
          : false,
      entities: [__dirname + '/**/*.Entity.{ts,js}'],
      synchronize,
      logging,
      dropSchema: false, // CLEARS DATABASE ON START
      cache: true,
      namingStrategy: new SnakeNamingStrategy()
    })
  } catch (e) {
    console.error(e)
    return process.exit(-1)
  }
}
