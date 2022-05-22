# Cordova
- Copied in cordova scripts in www folder
- angular.json - Changed output folder to cordova output folder (www)
- package.json - Merged with cordova to satisfy dependencies
- apps\mood-tracker\tsconfig.json - Set modules to compile as es5
- apps\mood-tracker\src\index.html - Changed base URL

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

# API
- apps\api\src\main.ts - Enabled CORS (allow communication between API and UI)
- apps\api\src\app\app.module.ts - Configured Mongo connection through mongoose 
- apps\api\src\app\app.module.ts - Added autoIndex argument to allow mongo to check for duplicate values
- libs\schemas\src\lib\user.schema.ts - Define the shape of users 
- libs\schemas\src\lib\user.schema.ts - Make email the unique index
- apps\api\src\app\auth\dto\create-user.dto.ts - Create dto using class-validation decorators

## Auth
- Added auth module, controller and service
- apps\api\src\app\auth\auth.module.ts - Imported mongoose schema for user creation
- apps\api\src\app\auth\auth.controller.ts - Added signup and sign in endpoints
- apps\api\src\app\auth\auth.service.ts - Create user by hashing password with bcrypt
- apps\api\src\app\auth\auth.service.ts - Sign in user and return JWtoken
- apps\api\src\app\auth\jwt.strategy.ts - Configured auth validation strategy
- apps\api\src\app\auth\auth.controller.ts - Added test endpoint protected by an authguard requiring valid token

# UI
- apps\mood-tracker\proxy.conf.json - Tried updating API URL but found out that I would need to change it when running on mobile after building with cordova
- apps\mood-tracker\tsconfig.json - Prevented warnings about strict templated and uninitialised vars
- apps\mood-tracker\src\environments\environment.ts - Edited to provide correct api url when running serve
- apps\mood-tracker\src\environments\environment.prod.ts - Edited to provide correct api url (my computer's IP) when running build
- apps\mood-tracker\src\app\app.module.ts - Defined lazy-loading routes within the app; loads modules as needed instead of all at once.

## Auth
- apps\mood-tracker\src\app\auth\sign-up\sign-up.component.ts - Made basic sign up component
- apps\mood-tracker\src\app\auth\sign-in\sign-in.component.ts - Made basic sign in component
- apps\mood-tracker\src\app\auth\auth.service.ts - Made auth service to put requests in


