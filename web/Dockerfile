FROM node:latest
ARG API_DOMAIN
ENV VITE_API_DOMAIN=$API_DOMAIN
WORKDIR /app
COPY . .
RUN yarn && yarn run build
EXPOSE 3000
CMD [ "yarn", "run", "preview" ]
