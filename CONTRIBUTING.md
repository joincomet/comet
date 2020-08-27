# Contributing
Thanks for your interest in Comet! Small bug fixes and enhancements are appreciated. Please contact Dan#7457 on our [Discord server](https://discord.gg/NPCMGSm) if you are interested in making a major change or addition.

## Stack
### Frontend
* [Vue.js](https://vuejs.org/) - Frontend framework
* [Nuxt.js](https://nuxtjs.org/) - Server-side rendering framework for Vue
* [Vue Apollo](https://apollo.vuejs.org/) - GraphQL integration for Vue

### Backend (API)
* [Node.js](https://nodejs.org/en/) - Backend framework for JavaScript
* [TypeScript](https://www.typescriptlang.org/) - JavaScript with types and more
* [TypeORM](https://typeorm.io/) - Object-relational mapping (ORM) framework for TypeScript/Node.js
* [GraphQL](https://graphql.org/) - A query language for APIs. Alternative to REST
* [TypeGraphQL](https://typegraphql.com/) - Easily create a GraphQL API using TypeScript decorators

## Running development environment

### Create environment variables
Create a file called `.env` in the project's root directory. Refer to [`example.env`](./example.env) for instructions.

### Start Docker
Simply install [Docker](https://www.docker.com/) on your development machine and run `docker-compose up`.
When finished starting, the frontend will be available at http://localhost:3000 and the API (with GraphQL Playground) will be available at http://localhost:4000/graphql

### Restoring database dump
The following commands will restore the database to the state of the production database on 8/22/20.
Personal information such as emails, password hashes, and IP addresses have been removed.
Any account can be logged into with password `password` if environment variable `ACCESS_TOKEN_SECRET` is set to `password`.

```
docker cp ./dump.sql comet_postgres_1:/dump.sql
docker exec -it comet_postgres_1 bash
psql -U postgres -d postgres -f /dump.sql
exit
```
