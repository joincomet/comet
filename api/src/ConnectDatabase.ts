import * as TypeORM from 'typeorm'
import fs from 'fs'
import path from 'path'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'

export const connectDatabase = async () => {
  try {
    return TypeORM.createConnection({
      type: 'postgres',
      url:
        process.env.NODE_ENV === 'production'
          ? `${process.env.DATABASE_URL}/${process.env.DATABASE_NAME}`
          : 'postgresql://postgres:password@postgres:5432/postgres',
      entities: [__dirname + '/entities/**/*.{ts,js}'],
      synchronize: true,
      logging: process.env.NODE_ENV !== 'production',
      dropSchema: false, // CLEARS DATABASE ON START
      cache: true,
      ssl:
        process.env.NODE_ENV === 'production'
          ? {
              ca: fs.readFileSync(
                path.resolve(__dirname, '../ca-certificate.crt'),
                { encoding: 'utf8' }
              )
            }
          : undefined,
      namingStrategy: new SnakeNamingStrategy()
    })
  } catch (e) {
    console.error(e)
    return process.exit(-1)
  }
}
