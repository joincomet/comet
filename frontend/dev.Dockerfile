FROM node:latest

RUN mkdir -p /usr/src/app
ENV NODE_ENV=development PORT=3000
EXPOSE 3000

WORKDIR /usr/src/app

COPY package.json yarn.lock /usr/src/app/

RUN yarn

COPY . /usr/src/app

CMD [ "yarn", "run", "dev" ]
