# Comet ([joincomet.app](https://joincomet.app))

![Banner](banner.png)

All-in-one chat and forums for communities.

## Tech Stack

### Frontend

- [React.js](https://reactjs.org/)
- [Electron](https://www.electronjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vite](https://vitejs.dev/guide/introduction.html)
- [Apollo GraphQL Client](https://github.com/apollographql/apollo-client)
- [GraphQL Code Generator](https://www.graphql-code-generator.com/)

### Backend

- [Node.js](https://nodejs.org/en/)
- [TypeScript](https://www.typescriptlang.org/)
- [Apollo Server Express](https://github.com/apollographql/apollo-server/tree/main/packages/apollo-server-express)
- [graphql-ws](https://github.com/enisdenjo/graphql-ws)
- [GraphQL Live Query](https://github.com/n1ru4l/graphql-live-query)
- [TypeGraphQL](https://typegraphql.com/)
- [MikroORM](https://mikro-orm.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [Redis](https://redis.io/)

[Join our Discord server](https://discord.gg/NPCMGSm)

## Development Instructions

### Frontend

#### Development

Start dev server:

- `yarn run dev:web`

#### Production

The frontend is a React app, and can be deployed in many ways. [joincomet.app](https://joincomet.app) is using GitHub Pages in this repo, but
another good option is [Cloudflare Pages](https://pages.cloudflare.com/)

Build frontend:

- `yarn run build:web`

Environment variables:

- `VITE_API_DOMAIN` (domain server is running on i.e. `api.joincomet.app`)

### Backend

#### Development

Start dev server with below environment variables:

- `yarn run dev:server`

Environment variables:

- `DATABASE_URL` (defaults to `postgresql://postgres:password@localhost:5432` if left blank)
- `ACCESS_TOKEN_SECRET` (required, secret used for encrypting passwords)
- `REDIS_URL` (optional, in-memory will be used if not provided)

The following environment variables are related to S3 file uploads and are required for file uploads to work. Comet has
only been tested with DigitalOcean Spaces, but may also work with AWS S3.

- `MEDIA_DOMAIN` (domain media is hosted on i.e. `media.joincomet.app`)
- `BUCKET` (name of bucket, DO Spaces requires this to be same as `MEDIA_DOMAIN` i.e. `media.joincomet.app`)
- `AWS_ENDPOINT` (endpoint bucket is hosted on i.e. `nyc3.digitaloceanspaces.com`)
- `AWS_ACCESS_KEY_ID` (access key ID provided by DO Spaces/AWS)
- `AWS_SECRET_ACCESS_KEY` (secret access key provided by DO Spaces/AWS)

#### Production

A Docker image is available at [Docker Hub](https://hub.docker.com/repository/docker/joincomet/server). [joincomet.app](https://joincomet.app) uses [DigitalOcean App Platform](https://www.digitalocean.com/products/app-platform/) to deploy the Docker image.
Run the Docker image with the above environment variables.
