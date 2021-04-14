import { authChecker } from '@/util/auth'
import { BuildSchemaOptions } from 'type-graphql'
import path from 'path'
import * as resolvers from '@/resolver'
import { GraphQLLiveDirective } from '@n1ru4l/graphql-live-query'

export const typeGraphQLConf = {
  resolvers: Object.values(resolvers) as unknown,
  emitSchemaFile:
    process.env.NODE_ENV === 'production'
      ? false
      : path.resolve(__dirname, '../../../schema.graphql'),
  validate: true,
  authChecker: authChecker,
  directives: [GraphQLLiveDirective]
} as BuildSchemaOptions
