FROM node:alpine

RUN mkdir -p /opt/app
RUN apk add --no-cache libc6-compat
ENV NODE_ENV production
ENV PORT 4000
EXPOSE 4000

WORKDIR /opt/app

COPY package.json /opt/app
COPY package-lock.json /opt/app

RUN npm install --no-optional

COPY . /opt/app

RUN addgroup -g 1001 -S nodejs
RUN adduser -S apiuser -u 1001

USER apiuser

CMD [ "npm", "start" ]
