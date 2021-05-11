import { ApolloLink, HttpOptions } from '@apollo/client'
import { createUploadLink } from './createUploadLink'

export class UploadLink extends ApolloLink {
  constructor(public options: HttpOptions = {}) {
    super(createUploadLink(options).request)
  }
}
