FROM node as node
RUN mkdir -p /app
WORKDIR /usr/src/app
COPY ./ .
RUN npm install
RUN npm run build --prod

FROM nginx
COPY --from=node /usr/src/app/www /usr/share/nginx/html