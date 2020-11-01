# Installation
[Join #dev on the CometX Discord server](https://discord.gg/7Ch6Yde)

## Stack
### Frontend
* [React.js](https://reactjs.org/)
* [Next.js](https://nextjs.org/)
* [Tailwind CSS](https://tailwindcss.com/)
  * Check out [Tailwind Play](https://play.tailwindcss.com/) to rapidly prototype components!

### Backend
* [Node.js](https://nodejs.org/en/)
* [TypeScript](https://www.typescriptlang.org/)
* [GraphQL](https://graphql.org/)
* [PostgreSQL](https://www.postgresql.org/)
* [Docker](https://www.docker.com/)

## Development environment

### Create `.env`
Create a file in the project root called `.env` based on [template.env](./template.env). Only `ACCESS_TOKEN_SECRET` is required to start the server.
If the other environment variables omitted, image uploading will fail, but everything else should work fine.

### Start with Docker-Compose
Simply install [Docker](https://www.docker.com/) on your development machine and run `docker-compose up`.
When finished starting, the following services will be available:
* Frontend (http://localhost:3000)
* API w/ GraphQL Playground (http://localhost:4000/graphql)
* PostgreSQL (`postgres://postgres:password@localhost:5432/postgres`)


