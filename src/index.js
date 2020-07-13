const { ApolloServer, gql } = require("apollo-server");
const { smhiAPI } = require("./datasource");

const typeDefs = gql`
  input StationInput {
    parameter: String
    stationId: String
  }

  type Reading {
    forecast: Int
    observed: Int
    localizedDate: String
  }

  type Query {
    stationData(stationName: String!): [Reading]
    getAllData(stationObjs: [StationInput]): [Reading]
  }
`;

const resolvers = {
  Query: {
    getAllData: async (_source, { stationObjs }, { dataSources }) => {
      return dataSources.stationsAPI.getStationData(stationObjs);
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

server.listen({ port: 4000 }, () =>
  console.log(
    `🌊  Nordic Surf is pumping at http://localhost:4000${server.graphqlPath}`
  )
);
