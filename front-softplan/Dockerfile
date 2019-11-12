FROM node:latest as angular

WORKDIR /front-softplan

COPY package.json /front-softplan

RUN npm install --silent
COPY . .
RUN npm run build


### STAGE 2: Setup ###

FROM nginx:alpine
VOLUME /var/cache/nginx
COPY --from=angular /front-softplan/dist /usr/share/nginx/html
## Copy our default nginx config
COPY ./config/nginx.conf /etc/nginx/conf.d/default.conf

