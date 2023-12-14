# OTP_Auth

# START

1. npm i
2. npm start
3. API URL:
   "http://localhost:5000/register":
   Body:JSON: {
   "username": "vvc",
   "email": "vvc6@gmail.com",
   "auth_enabled": true
   }
   "http://localhost:5000/login":
   Body: JSON: {
   "userid": "0bb5fc24-0a79-434a-8d56-d6c2fc33e575", // GET userid from '/register' api response
   "otp": "515539" // Get OTP from 'https://totp.app/' by providing secret key
   }

#Description
Project: OTP Authentication (2FA)
Main File: server.js
Controllers: usercontroller.js
Middlewares: auth.js
Routes: routes.js
Database: Database.json

API:
/register: Register API is for creating a user with following keys to store in Database.json
username: username of user.
email: email of user.
auth_enabled: true/false: User with 2FA (true) or simple Authentication(false).
Implemented to specify user a specific authentication for 'Claim-Based Authorization'.
id: user id.
secret: Speakeasy secret data

    /login: Login API is for verifying a user with simple authentication and 2FA based on 'Claim-based Authorization' using middleware.

Controllers:
usercontroller.js: User Controller for main/business logic.

Middleware:
auth.js: Implemented to enforce access control based on claims for both users (2FA auth enabled users and simple users).

Database:
Database.json: To store users with its data.

Routes:
routes.js: Route defined file.
