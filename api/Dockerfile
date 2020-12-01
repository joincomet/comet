FROM node:latest

RUN mkdir -p /usr/src/app
ENV NODE_ENV=production PORT=4000
EXPOSE 4000

WORKDIR /usr/src/app

COPY package.json yarn.lock /usr/src/app/

RUN yarn

COPY . /usr/src/app

RUN yarn build

CMD [ "yarn", "start" ]
