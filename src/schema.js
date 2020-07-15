const { ApolloServer, gql } = require("apollo-server-express");
const { DateTimeResolver } = require("graphql-scalars");

const typeDefs = gql`
  scalar DateTime

  input StationInput {
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
    parameterKey: Int
    readingName: String
    readingUnit: String
    readingValues: [ReadingValue]
  }

  type Query {
    waveHeightAverage(stationInput: [StationInput]): [Reading]
    seaTemperature(stationInput: [StationInput]): [Reading]
    waveDirection(stationInput: [StationInput]): [Reading]
    wavePeriodMax(stationInput: [StationInput]): [Reading]
    wavePeriodAverage(stationInput: [StationInput]): [Reading]
    waveHeightMax(stationInput: [StationInput]): [Reading]
  }
`;

const resolvers = {
  Query: {
    waveHeightAverage: async (_source, { stationInput }, { dataSources }) => {
      return dataSources.stationsAPI.getStationData({
        parameter: 1,
        stationInput
      });
    },
    seaTemperature: async (_source, { stationInput }, { dataSources }) => {
      return dataSources.stationsAPI.getStationData({
        parameter: 5,
        stationInput
      });
    },
    waveDirection: async (_source, { stationInput }, { dataSources }) => {
      return dataSources.stationsAPI.getStationData({
        parameter: 8,
        stationInput
      });
    },
    wavePeriodMax: async (_source, { stationInput }, { dataSources }) => {
      return dataSources.stationsAPI.getStationData({
        parameter: 9,
        stationInput
      });
    },
    wavePeriodAverage: async (_source, { stationInput }, { dataSources }) => {
      return dataSources.stationsAPI.getStationData({
        parameter: 10,
        stationInput
      });
    },
    waveHeightMax: async (_source, { stationInput }, { dataSources }) => {
      return dataSources.stationsAPI.getStationData({
        parameter: 11,
        stationInput
      });
    }
  },
  DateTime: DateTimeResolver
};

module.exports = { typeDefs, resolvers };
