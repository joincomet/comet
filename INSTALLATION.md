# Installation

## Create `.env`
Create a file in the root folder called `.env` with the following contents:
```
# Required
ACCESS_TOKEN_SECRET=<secret used to encrypt login tokens>

# Defaults to `postgresql://postgres:password@localhost:5432`
DATABASE_URL=<postgres connection URL>
# Defaults to `postgres`
DATABASE_NAME=<postgres database name>

# The following are required for image uploads and link embeds & thumbnails to work
BUCKET=<name of S3 bucket>
MEDIA_DOMAIN=<domain for bucket>
AWS_ENDPOINT=<AWS endpoint i.e. region.amazonaws.com>
AWS_ACCESS_KEY_ID=<AWS access key ID>
AWS_SECRET_ACCESS_KEY=<AWS secret access key>
```

## Development
A postgres database must be available at `DATABASE_URL`

* Web (http://localhost:3000): `yarn workspace web run dev:vite`
* Electron app (Web must be running first): `yarn workspace web run dev:electron`
* Server w/ GraphQL Playground (http://localhost:4000/graphql): `yarn workspace server run dev`

## Deploy Production to DigitalOcean
Comet is configured to run on DigitalOcean App Platform.

Create app (Must have [doctl](https://www.digitalocean.com/docs/apis-clis/doctl/) installed):
```sh
doctl apps create --spec .do/app.yaml
```
