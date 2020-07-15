const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
const { smhiAPI } = require("./datasource");
const { DateTimeResolver } = require("graphql-scalars");
const responseCachePlugin = require("apollo-server-plugin-response-cache");
const rateLimit = require("express-rate-limit");
const depthLimit = require("graphql-depth-limit");

const PORT = 4000;

const app = express();

// Currently uses an in-memory store until we need to move it into
// its own store with perhaps Redis
// LIMIT: 50 requests per 60 minutes
const limiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 50,
  message:
    "Too many queries created from this IP address, please try again after an hour"
});

app.use(limiter);

const typeDefs = gql`
  scalar DateTime

  input StationInput {
    # parameter: String
    stationId: String
    period: String
  }

  type ReadingValue {
    value: Float
    date: DateTime
  }

  type Reading {
    stationId: String
    stationName: String
    waveHeight: ReadingParameter
    seaTemperature: ReadingParameter
  }

  type ReadingParameter {
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
       // TODO: Find a simple endpoint that might only return stationName or similar
      return dataSources.stationsAPI.getStationData(stationObjs);
    }
  },
  Reading: {
    async waveHeight({ stationId, period }) {
      return dataSources.stationsAPI.getStationData([
        { parameter: 1, stationId, period }
      ])
    },
    async seaTemperature({ stationId, period }) {
      return dataSources.stationsAPI.getStationData([
        { parameter: 5, stationId, period }
      ])
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
  plugins: [responseCachePlugin()],
  validationRules: [depthLimit(5)],
  introspection: true,
  playground: true,
  engine: {
    reportSchema: true
  }
});

server.applyMiddleware({ app, path: "/graphql" });

app.listen({ port: process.env.PORT || PORT }, () => {
  console.log(
    `🌊  SMHI GraphQL API (Unofficial) is serving at http://localhost:4000${server.graphqlPath}`
  );
});
