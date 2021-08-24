# Add Comments to Implementation of the MERN-stack Architecture

## Root-level Functionality

- The `npm start` script: In production, we only run the back-end server, which will serve the built React application code as its front end.
- The `npm run develop` script: In development, we need to run both a back-end server and the React development server, so we use the `concurrently` library to execute two separate promises at the same time.

- The `npm install` script: Since our dependencies for the entire application exist in two smaller applications, we use this script to automatically install all of them at once.

- The `npm run seed` script: We can seed our database with data when we run this command.

- The `npm run build` script: When we deploy our application, we instruct the hosting service to execute the `build` command and build our production-ready React application."

```json
"scripts": {
  "start": "node server/server.js",
  "develop": "concurrently \"cd server && npm run watch\" \"cd client && npm start\"",
  "install": "cd server && npm i && cd ../client && npm i",
  "seed": "cd server && npm run seed",
  "build": "cd client && npm run build"
},
```

## Client-side Functionality

- Since we run a front-end and back-end server for our full-stack application in development, we set it up so all client-side requests to our API server are prefixed with the API server's URL.

```json
"proxy": "http://localhost:3001",
```

## Server-side Functionality

- In production, when we no longer need to use the Create React App development server, we set up our server to serve the built React front-end application that is in the `../client/build` directory.

```js
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}
```

- Since the React front-end application will handle its own routing, we set up a wildcard route on our server that will serve the front end whenever a request for a non-API route is received.

```js
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});
```
