FROM nginx:alpine

ARG CERT
ARG KEY

RUN echo -e "$CERT" > /etc/ssl/cert.pem && echo -e "$KEY" > /etc/ssl/key.pem

COPY ./nginx.conf /etc/nginx/conf.d/nginx.conf
COPY ./cloudflare.crt /etc/ssl/cloudflare.crt
