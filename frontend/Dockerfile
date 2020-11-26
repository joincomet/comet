FROM node:latest

RUN mkdir -p /usr/src/app
ENV NODE_ENV=production PORT=3000
EXPOSE 3000

WORKDIR /usr/src/app

COPY package.json yarn.lock /usr/src/app/

RUN yarn

COPY . /usr/src/app

RUN yarn run build && npx next telemetry disable

CMD [ "yarn", "start" ]
