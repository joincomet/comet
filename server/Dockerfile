FROM node:15
ENV NODE_ENV=production NODE_TLS_REJECT_UNAUTHORIZED=0
WORKDIR /app
COPY . .
RUN yarn && yarn run build:server
CMD ["yarn", "run", "start:server"]
