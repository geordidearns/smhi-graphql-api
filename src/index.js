const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
const { smhiAPI } = require("./datasource");

const typeDefs = gql`
  type Reading {
    forecast: Int
    observed: Int
    localizedDate: String
  }

  type Query {
    stationData(stationName: String!): [Reading]
  }
`;

const resolvers = {
  Query: {
    stationData: async (_source, { stationName }, { dataSources }) => {
      return dataSources.stationsAPI.getStation(stationName);
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => {
    return {
      stationsAPI: new smhiAPI()
    };
  }
});

const app = express();
server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log(
    `🌊  Nordic Surf is pumping at http://localhost:4000${server.graphqlPath}`
  )
);
