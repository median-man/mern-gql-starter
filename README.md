# MERN-GQL-START

Boilerplate app for full-stack MERN app with Create React App client tool chain. Includes React, JWT authentication, Mongoose/MongoDB, Apollo Server/Client, and ExpressJS.

## Getting Started

- Add a `.env` file to `server` directory to run locally. Use `server/.env.example` as a template.

- `npm start` script: Production startup. Only runs backend server.

- `npm run develop` script: Uses `concurrently` to run the back-end with `nodemon` and launches the `create-react-app` development server for front-end development. `concurrently` runs these within the same terminal. Logging is tagged with `[server]` or `[client]`.

- `npm run client` script: Launches the `create-react-app` development server for the client only. Will not start back-end.

- `npm run server` script: Starts the back-end server with `nodemon` for easy development without launching the client.

- The `npm install` script: Installs all dependencies for root as wells as `client` and `server`.

- The `npm run build` script: Runs `create-react-app` build script to create client bundles and assets.

## Deploying to Heroku

- Requires a MongoDB server. MongoDB Atlas is a fairly easy choice for this requirement. Create an Atlas account and setup a database.

- Add the following values to the Heroku config for the app:

  - `SECRET` - used for signing and verifying tokens
  - `MONGODB_URI` - used for connecting to MongoDB service

- Push your code to GitHub

- Connect your Heroku app with GitHub or push code directly to Heroku. (See [Deploying Node.js Apps on Heroku](https://devcenter.heroku.com/articles/deploying-nodejs))

## Apollo Server

This project uses `apollo-server-express v 3.x` which means GraphQL Playground (deprecated) is not included. Instead, Apollo Server 3 uses [Apollo Studio](https://www.apollographql.com/docs/studio/) as a development tool for building your api. If you would like to use GraphQL Playground, refer to [this guide](https://www.apollographql.com/docs/apollo-server/migration/#graphql-playground) to enable the tool.

## Create React App

The client for this project is built with the `create-react-app` tool chain. The README file generated by `create-react-app` has been preserved. See [client/README.md](./client/README.md) for details about the tools.
