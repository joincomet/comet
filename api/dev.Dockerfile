FROM node:alpine

RUN mkdir -p /opt/app
ENV NODE_ENV=development PORT=4000
EXPOSE 4000

WORKDIR /opt/app

COPY package.json yarn.lock /opt/app/

RUN yarn

COPY . /opt/app

CMD [ "yarn", "run", "dev" ]
