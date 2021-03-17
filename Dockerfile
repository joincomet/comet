FROM node:alpine

RUN mkdir -p /usr/src/app
EXPOSE 4000

WORKDIR /usr/src/app

COPY . /usr/src/app/

RUN yarn

CMD [ "yarn", "workspace", "server", "start" ]
