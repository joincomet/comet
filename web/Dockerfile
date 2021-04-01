FROM node:latest

RUN yarn global add http-server

WORKDIR /app

COPY .yarn .yarnrc.yml yarn.lock .pnp.cjs package.json web/package.json ./

RUN yarn

COPY . .

RUN yarn run build

EXPOSE 3000
CMD [ "http-server", "web/dist", "-p", "3000" ]
