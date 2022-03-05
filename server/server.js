const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });
const express = require("express");
const { ApolloServer } = require("apollo-server-express");

const { typeDefs, resolvers } = require("./schemas");
const db = require("./config/connection");
const { authMiddleware } = require("./util/auth");

const PORT = process.env.PORT || 3001;

startServer(typeDefs, resolvers);

async function startServer(typeDefs, resolvers) {
  try {
    // Wait for db connection
    await new Promise((resolve) => db.once("open", resolve));

    // create apollo server
    const server = new ApolloServer({
      typeDefs,
      resolvers,
      context: authMiddleware,
    });
    await server.start();

    // create express app
    const app = express();
    server.applyMiddleware({
      app,
      path: "/graphql",
    });

    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());

    if (process.env.NODE_ENV === "production") {
      // Handle requests for client assets
      app.use(express.static(path.join(__dirname, "../client/build")));

      // Respond with react client for all other requests. This route should be
      // the last route added to the express app.
      app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../client/build/index.html"));
      });
    }

    // start listening for requests
    await new Promise((resolve) => app.listen({ port: PORT }, resolve));
    console.log(
      `🚀 Apollo Server ready at http://localhost:${PORT}${server.graphqlPath}`
    );
  } catch (error) {
    console.log(error);
    console.log(
      "⛔ There was an error starting the server. See above for details."
    );
    console.log("Shutting down.");
    process.exit(1);
  }
}
