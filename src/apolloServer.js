const { ApolloServer } = require("apollo-server-express");
const responseCachePlugin = require("apollo-server-plugin-response-cache");
const depthLimit = require("graphql-depth-limit");

const { smhiAPI } = require("./datasources/smhi");
const { typeDefs, resolvers } = require("./schema");

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => {
    return {
      stationsAPI: new smhiAPI()
    };
  },
  plugins: [responseCachePlugin()],
  validationRules: [depthLimit(5)],
  introspection: true,
  playground: true,
  engine: {
    reportSchema: true
  }
});

module.exports = { apolloServer };
