const express = require("express");
const cors = require("cors");
// const bodyParser = require("body-parser");
const { ApolloServer, gql } = require("apollo-server-express");
const { smhiAPI } = require("./datasource");
const { DateTimeResolver } = require("graphql-scalars");

const app = express();

app.use(cors());
// app.use(bodyParser());

const typeDefs = gql`
  scalar DateTime

  input StationInput {
    parameter: String
    stationId: String
  }

  type ReadingValue {
    value: Float
    date: DateTime
  }

  type Reading {
    stationId: String
    stationName: String
    parameterKey: Int
    readingName: String
    readingUnit: String
    readingValues: [ReadingValue]
  }

  type Query {
    stationData(stationName: String!): [Reading]
    stationReadings(stationObjs: [StationInput]): [Reading]
  }
`;

const resolvers = {
  Query: {
    stationReadings: async (_source, { stationObjs }, { dataSources }) => {
      return dataSources.stationsAPI.getStationData(stationObjs);
    }
  },
  DateTime: DateTimeResolver
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => {
    return {
      stationsAPI: new smhiAPI()
    };
  },
  introspection: true,
  playground: true
});

server.applyMiddleware({ app, path: "/graphql" });

app.listen({ port: process.env.PORT || 4000 }, () => {
  console.log(
    `🌊  SMHI GraphQL API (Unofficial) is serving at http://localhost:4000${server.graphqlPath}`
  );
});
