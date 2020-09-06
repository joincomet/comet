# Installation

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

## Development environment

### Create .env files
Create the following files and set the environment variables as demonstrated in the examples:
* cometx/postgres.env ([example](./postgres.example.env))
* cometx/api/.env ([example](./api/example.env))
* cometx/frontend/.env ([example](./frontend/example.env))

### Start Docker-Compose
Simply install [Docker](https://www.docker.com/) on your development machine and run `docker-compose up`.
When finished starting, the following services will be available:
* Frontend (http://localhost:3000)
* API w/ GraphQL Playground (http://localhost:4000/graphql)
* PostgreSQL (postgres://postgres:<POSTGRES_PASSWORD>@localhost:5432/postgres)

### Restoring database dump
[Download dump.sql](https://gist.githubusercontent.com/danbeneventano/c93dfedb12e4522dc762d52b6a01ed72/raw/35a0a6373d151b705688e38ff166bc1fca81268c/dump.sql)

The following commands will restore the database to the state of the production database on 8/22/20.
Personal information such as emails, password hashes, and IP addresses have been removed.
Any account can be logged into with password `password` if environment variable `ACCESS_TOKEN_SECRET` is set to `password`.

```
docker cp ./dump.sql postgres:/dump.sql
docker exec -it postgres bash
psql -U postgres -d postgres -f /dump.sql
exit
```
