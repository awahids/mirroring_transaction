> **Thank you** for the opportunity that has been given to me to take this
> pretest

# Rest API PrivyId

## Framework
A user simple API build using **[expressJS](https://expressjs.com/)** framework with **[PostgreSQL](https://www.postgresql.org/)** for database.

## How to install
Make sure you already install all the requirements then clone or download the repository.
```bash
git clone https://gitlab.com/awhds_/privyid.git
```
### Install node modules
Go to **each** Node folder and run
```bash
$ npm i
```
to install all the dependencies.
### Set up .env
Make  `.env`  file on  **each**  Node folder for the environment variables
```bash
DB_USER=""
DB_NAME=""
DB_PASS=""
DB_HOST=""

PWD_TOKEN=""
```

## Create Database and seeder
create database using `npm`
```bash
$ npm run database
```
when the process of creating the database is complete, you can **create a table** with the following:
```bash
$ npm run db:migrate
```
then add a mockup of the data that is already in the seeder
```bash
$ npm run db:seed
```
### Run
**To run it localy**, go to the Node folder then use
```bash
$ npm start
```

## End Point REST API

### User Sign Up and Sign In
When signing up the password will be automatically **encrypted** using `JWT` and when logging in it will return a **token** to be used to store logged in user data. 

> To login, you can only use your **username** and **password**

```json
{
	username  	: "privyid",
	email  		: "wahid@privy.id",
	password  	: "password"
}, {
	username  	: "privyid1",
	email  		: "aws@privy.id",
	password  	: "password"
}
```
An example of a token that will be *returned when the user logs in* and each token only has an active period of **1 hour**
```bash
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InByaXZ5aWQiLCJpZCI6MSwiaWF0IjoxNjM3NjkxNDYxLCJleHAiOjE2Mzc2OTUwNjF9.IFZi35EYDyU4-rTjXtnWiI3JR8b63M2eamUkFxjD2Lo
```
the following endpoints are available
```bash
SignUp 			POST    .../api/v1/auth/signup/
SignIn			POST	.../api/v1/auth/signin/
getBalanceUser	GET		.../api/v1/balance/
topUpBalance	PUT		.../api/v1/topup/
transferBalance	PUT		.../api/v1/transfer/
```
`getBalanceUser` , `topUpBalance` and `transferBalance` endpoints can only be accessed when the user is logged in