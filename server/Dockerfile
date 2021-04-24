FROM node:latest
WORKDIR /app
COPY . .
RUN yarn && yarn run build:server
CMD ["yarn", "run", "start:server"]
