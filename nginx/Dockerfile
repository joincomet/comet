FROM nginx:alpine

COPY ./nginx.conf /etc/nginx/conf.d/nginx.conf
COPY ./cloudflare.crt /etc/ssl/cloudflare.crt
COPY ./cert.pem /etc/ssl/cert.pem
COPY ./key.pem /etc/ssl/key.pem
