FROM node:15

ENV NODE_ENV=production \
    PGSSLMODE=require \
    NEXT_TELEMETRY_DISABLED=1 \
    HOST=0.0.0.0

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json yarn.lock .pnp.js .yarnrc.yml ./
COPY .yarn .yarn
COPY api/package.json api/package.json
COPY frontend/package.json frontend/package.json
RUN yarn install

COPY api api
COPY frontend frontend
RUN yarn workspace frontend build
