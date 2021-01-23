# Installation

## Create `.env`
Create a file in the root folder called `.env` with the following contents:
```
# Required
ACCESS_TOKEN_SECRET=<secret used to encrypt login tokens>

# Optional, required for image uploads and embeds to work
BUCKET=<name of S3 bucket>
MEDIA_DOMAIN=<domain for bucket>
AWS_ENDPOINT=<AWS endpoint i.e. region.amazonaws.com>
AWS_ACCESS_KEY_ID=<AWS access key ID>
AWS_SECRET_ACCESS_KEY=<AWS secret access key>
```

## Start with Docker-Compose
Must have [Docker](https://www.docker.com/) installed.

Commands:
- Build (must be done after dependency change): `./build-dev.sh`
- Start: `docker-compose up -d`
- Stop: `docker-compose down`
- View logs: `docker logs --follow <api|frontend|postgres>`
- Restart service: `docker-compose restart <api|frontend|postgres>`

When finished starting, the following services will be available:
* Frontend (http://localhost:3000)
* API w/ GraphQL Playground (http://localhost:4000/graphql)
* PostgreSQL (`postgres://postgres:password@localhost:5432/postgres`)

## Deploy Production to DigitalOcean
CometX is configured to run on DigitalOcean App Platform.

Create app (Must have [doctl](https://www.digitalocean.com/docs/apis-clis/doctl/) installed):
```sh
doctl apps create --spec .do/app.yaml
```
