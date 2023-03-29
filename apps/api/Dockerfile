FROM node
ENV api_url mongodb://mongo:27017
WORKDIR /usr/src/app
COPY ./ .
RUN npm install
RUN npm run build api 
CMD ["node", "dist/apps/api/main.js" ]