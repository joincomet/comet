FROM node:latest
ARG API_DOMAIN
ENV VITE_API_DOMAIN=$API_DOMAIN
RUN yarn global add http-server
WORKDIR /app
COPY . .
RUN yarn && yarn run build
EXPOSE 3000
CMD [ "http-server", "web/dist", "-p", "3000" ]
