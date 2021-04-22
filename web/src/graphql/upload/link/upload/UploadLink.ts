import { ApolloLink, HttpOptions, RequestHandler } from "@apollo/client";
import { createUploadLink } from "./createUploadLink";

export class UploadLink extends ApolloLink {
  public requester: RequestHandler;
  constructor(public options: HttpOptions = {}) {
    super(createUploadLink(options).request);
  }
}
