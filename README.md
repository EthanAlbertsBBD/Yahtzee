# Yahtzee
A simplified node express implementation of the popular game Yahtzee!
----------------------------------------------------------
### Requirements
  - A DBMS that runs sql installed (prefferably Microsoft SQL Server Management Studio)
  - A terminal/ IDE Terminal
  - Node installed on you system   
  ```javascript
  npm install -g npm@9.7.1
  ```

## Installation Guide

### Data Base Set up
After installing your dbms run the ddl.sql (create the local database) and dml.sql script (add mock data)

### Dependency installation for servers

Install dependencies for the Resource server by running 
  ```javascript
  npm run resource-install
  ```

Install dependencies for the Authentication server by running 
  ```javascript
  npm run authentication-install
  ```

## Environment Variable Guide
Please make sure to check that the secret key is the same in both .env files.
Create a .env file in the root of the Resource-server folder with the folling keys. Insert values Where we have not filled them in already
```javascript
GOOGLE_CLIENT_ID=48579065357-mkqbtlvpfs2fkh1r0vpk32etc1rgnsad.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=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
GOOGLE_CALLBACK_URL=https://localhost:8000/auth/google/callback
GITHUB_CLIENT_ID=aac8714566f03aceb1cf
GITHUB_CLIENT_SECRET=04fb241e8fcd459faa9fc35a848842e4187a5b8a
GITHUB_CALLBACK_URL=https://localhost:8000/auth/github/callback
SESSION_SECRET= []
DATABASE_HOST= []
DATABASE_PASSWORD=[]
DATABASE_USER=[]
SECRET_KEY=[]
PORT=8000
AUTH_SERVER_HOST=localhost
AUTH_SERVER_PORT=9000
JWT_EXPIRES_IN=1h
JWT_ISSUER=https://f758uv5bqz.us-east-1.awsapprunner.com/
JWT_AUDIENCE=OAuth2ClientId
```

Create a .env file in the root of the Authentication-server folder with the folling keys. Insert values Where we have not filled them in already
```javascript
DATABASE_HOST= []
DATABASE_PASSWORD=[]
DATABASE_USER=[]
SECRET_KEY=[]
PORT=9000
JWT_EXPIRES_IN=1h
JWT_ISSUER=https://f758uv5bqz.us-east-1.awsapprunner.com/
JWT_AUDIENCE=OAuth2ClientId
```


## To run the servers 
Once you have installed the dependencies for both servers and configured the local .env files in the root directory of each folder

You can run the Authentication Server from the root folder using 
  ```javascript
npm run authentication-start
```

You can run the Resource Server from the root folder using 
  ```javascript
 npm run resource-start
  ```

OR

If you have problems wth your .env variables being read We have found that cd into the root directory of the server folder and running
  ```javascript
 npm start
  ```
can help


Good luck! 🎲🍀
