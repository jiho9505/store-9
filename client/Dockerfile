FROM node:16

RUN apt update -y
RUN apt install nginx -y
RUN echo "daemon off;" >> /etc/nginx/nginx.conf
RUN mkdir -p /app

COPY ./client/config/nginx.conf /etc/nginx/conf.d/nginx.conf

WORKDIR /app

ADD ./client /app

RUN npm install
RUN npm run build:prod

EXPOSE 8080

CMD ["/usr/sbin/nginx"]