user@test.com - password 
some@one.com - password

# Cordova
- Copied in cordova scripts in www folder
- angular.json - Changed output folder to cordova output folder (www)
- package.json - Merged with cordova to satisfy dependencies
- apps\mood-tracker\tsconfig.json - Set modules to compile as es5
- apps\mood-tracker\src\index.html - Changed base URL
- apps\mood-tracker\src\main.ts - Added a wait for cordova step

# Misc
- Learned about validation pipes
- Enforced validation on all endpoints
- Added global validation pipe [for DTO]
- Added class validation decorators to DTOs
- Added compiled cordova outputs to .gitignore 
- Removed Cypress e2e project 
- Set static IP to prevent changing between sessions
- Learned about libs; methods that make data and functions available to all client applications.
- Put my DTOs and schemas in libs so Angular can read them
- apps\mood-tracker\tsconfig.json - set suppressImplicitAnyIndexErrors to true, to allow access to cordova through window object as cordova was an unknown property of window
- Link all pages via routerLink
- Something that implements canActivate() - fires request to check if user is authenticated; if no or invalid token, directs to auth page [route guard]

# API
- apps\api\src\main.ts - Enabled CORS (allow communication between API and UI)
- apps\api\src\app\app.module.ts - Configured Mongo connection through mongoose 
- apps\api\src\app\app.module.ts - Added autoIndex argument to allow mongo to check for duplicate values
- libs\schemas\src\lib\user.schema.ts - Define the shape of users 
- libs\schemas\src\lib\user.schema.ts - Make email the unique index
- apps\api\src\app\auth\dto\create-user.dto.ts - Create dto using class-validation decorators
- apps\mood-tracker\src\app\auth\landing-page\landing-page.component.ts - Added Landing page which directs user to portal when sign in is validated

## Auth
- Added auth module, controller and service
- apps\api\src\app\auth\auth.module.ts - Imported mongoose schema for user creation
- apps\api\src\app\auth\auth.controller.ts - Added signup and sign in endpoints
- apps\api\src\app\auth\auth.service.ts - Create user by hashing password with bcrypt
- apps\api\src\app\auth\auth.service.ts - Sign in user and return JWtoken
- apps\api\src\app\auth\jwt.strategy.ts - Configured auth validation strategy
- apps\api\src\app\auth\auth.controller.ts - Added test endpoint protected by an authguard requiring valid token

## Reminders
- Created CRUD API endpoints for reminders
- Created libs for reminders {title, text, datetime, user}

# UI
- apps\mood-tracker\proxy.conf.json - Tried updating API URL but found out that I would need to change it when running on mobile after building with cordova
- apps\mood-tracker\tsconfig.json - Prevented warnings about strict templated and uninitialised vars
- apps\mood-tracker\src\environments\environment.ts - Edited to provide correct api url when running serve
- apps\mood-tracker\src\environments\environment.prod.ts - Edited to provide correct api url (my computer's IP address) when running build
- apps\mood-tracker\src\app\app.module.ts - Defined lazy-loading routes within the app; loads modules as needed instead of all at once.
- Disabled device back button with a Renderer eventListener & added back buttons to app to aid navigation 

## Portal
- Created portal module
- Created portal component & added router outlet
- Created dashboard and reminders components
- Defined routes in portal module
- Defined routes in app module (loads children of portal)

## Auth
- apps\mood-tracker\src\app\auth\sign-up\sign-up.component.ts - Made basic sign up component
- apps\mood-tracker\src\app\auth\sign-in\sign-in.component.ts - Made basic sign in component
- apps\mood-tracker\src\app\auth\auth.service.ts - Made auth service to put requests in

## Reminders
- Added a proof-of-concept button to trigger reminder notification in 1min time (android)
- Created form for creating a reminder
- Added a reminder creation function to trigger notification at given time of given day
- When creating a reminder, also create in database (new service)
- Added ability to delete reminders from the database, which also cancels them on the device
- Added ability to edit reminders in database and Cordova
- Can now get a reminder by ID, which populates the form fields for editing
- 'Show reminders' button now displays formatted relevant information (title, text, time) of scheduled reminders
- Created a method that fetches all reminders from database and make sure that each one has been created on the device << further testing required >>
- Displays error message if no day is selected.
  
# Libs
- Have created Schemas and DTOs for users, reminders, moods and notes
- Have added validation using class-validator decorators on properties

## Mood
- Selected mood (of 7) is added to database on saving
- Added ability to update mood
- Added ability to edit today's mood if already submitted
- Created asset (emoji) for each mood - selected mood change style? i.e, line icon change to filled when selected
- Created history page for moods which displays as a chart

## Note/ symptom
- Create note module, component & service 
- When creating a note, save to database
- Created a method that fetches all notes from database
- Created page which displays fetched notes from database as a diary of sorts
- Can update days mood

# Next steps
## Nice to have
- Remove reminder elements when on browser
- Week-to-view component on dashboard
- Display next reminder due on dashboard
- Date picker which displays notes & mood for day
- When clicking on node in mood chart, displays days note below.
- data is saved to local storage if database is unavailable or device offline & will retry on (something happening)

# Dockerising

Running an application in containers makes them environment and cloud agnostic. In order to run in the cloud, this app would require two containers for the backend - mongo and our NEST API. Angular can run in a container to allow for a web based portal without the notification feature or with a different plugin to trigger them. The NestJS API would be a single multi-tenanted endpoint for users to retrieve data.

multi-stage build which keeps container size down
webpack handles everything angular-wise
uses latest node image as base image
then runs npm install
then copies compiled code into nginx image 
which can then be exposed on port 80

hosting in cloud - api & database to use aws' ec2 to run containers eg.
docker allows management of these containers locally

## to start docker network
- docker network create mood-tracker-network

## to start mongo
- docker run -d -p 27017:27017 --net mood-tracker-network --name mongo -e MONGO_INITDB_ROOT_USERNAME=admin -e MONGO_INITDB_ROOT_PASSWORD=password mongo

## to run mood-tracker from root of project
- docker build -t mood-tracker -f ./apps/mood-tracker/Dockerfile .
- docker run --net mood-tracker-network --name mood-tracker -p 80:80 mood-tracker

## to run api from root of project
- docker build -t api -f ./apps/api/Dockerfile .
- docker run --name api --net mood-tracker-network -p 3000:3000 api