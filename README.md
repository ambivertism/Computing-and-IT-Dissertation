# MoodTracker

## How to run

Start new Mongo container:
> docker run -d -p 27017:27017 --name mongo -e MONGO_INITDB_ROOT_USERNAME=admin -e MONGO_INITDB_ROOT_PASSWORD=password mongo 

Start API server:
> npm run start api

Build Angular app:
> npm run build mood-tracker

Build & run Cordova app:
> cordova run android


## How to stop

Stop server running:
> ctrl + C (x2)

Stop Mongo container:
> docker stop mongo

Remove Mongo container (empties database):
> docker rm mongo