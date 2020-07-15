const express = require("express");

const { apolloServer } = require("./apolloServer");
const { rateLimiter } = require("./utils/rateLimiter");

const PORT = 4000;

const app = express();

app.use(rateLimiter);

apolloServer.applyMiddleware({ app, path: "/graphql" });

app.listen({ port: process.env.PORT || PORT }, () => {
  console.log(
    `🌊  SMHI GraphQL API (Unofficial) is serving at http://localhost:4000${apolloServer.graphqlPath}`
  );
});
