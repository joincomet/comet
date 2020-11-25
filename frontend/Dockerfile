FROM node:alpine

RUN mkdir -p /opt/app
RUN apk add --no-cache libc6-compat
ENV NODE_ENV production
ENV PORT 3000
EXPOSE 3000

WORKDIR /opt/app

COPY package.json /opt/app
COPY package-lock.json /opt/app

RUN npm install --no-optional

COPY . /opt/app

RUN npm run build

RUN npx next telemetry disable

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

USER nextjs

CMD [ "npm", "start" ]
