const { RESTDataSource } = require("apollo-datasource-rest");
// Use currently: mapKeys, groupBy
const _ = require("lodash");

class smhiAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL =
      "https://www.smhi.se/wpt-a/backend_seapointforecast_nextgen/oceandata/stations/wave/";
  }

  // async getStation(stationName) {
  //   const data = await this.get(`${stationName}/rh2000`);
  //   const renamedFields = {
  //     OBSERVATION: "observed",
  //     SWAN: "forecast",
  //     localDate: "localizedDate"
  //   };

  //   let replacedKeys = data.map(obj =>
  //     _.mapKeys(obj, (value, key) => {
  //       return renamedFields[key];
  //     })
  //   );

  //   return replacedKeys;
  // }

  async getStationDataByParameters(parameter, station) {
    return await this.get(
      `https://opendata-download-ocobs.smhi.se/api/version/latest/parameter/${parameter}/station/${station}/period/latest-day/data.json `
    );
  }

  async getStationData(stationObjs) {
    const data = await Promise.allSettled(
      stationObjs.map(x =>
        this.getStationDataByParameters(x.parameter, x.stationId)
      )
    ).then(results => {
      const filteredResults = results.map(({ status, value }) => {
        if (status === "rejected") {
          console.log("handle error here");
        }

        return value;
      });

      return filteredResults;
    });

    const remappedData = data.map(x => {
      return {
        stationId: x.station.key,
        stationName: x.station.name,
        parameterKey: x.parameter.key,
        readingName: x.parameter.name,
        readingUnit: x.parameter.unit,
        readingPeriodTo: x.period.to,
        readingPeriodFrom: x.period.from,
        readingValues: x.value
      };
    });

    return remappedData;
  }
}

module.exports = { smhiAPI };
