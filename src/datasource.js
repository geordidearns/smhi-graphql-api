const { RESTDataSource } = require("apollo-datasource-rest");
// Use currently: mapKeys
const _ = require("lodash");

class smhiAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL =
      "https://www.smhi.se/wpt-a/backend_seapointforecast_nextgen/oceandata/stations/wave/";
  }

  async getStation(stationName) {
    const data = await this.get(`${stationName}/rh2000`);
    const renamedFields = {
      OBSERVATION: "observed",
      SWAN: "forecast",
      localDate: "localizedDate"
    };

    let replacedKeys = data.map(obj =>
      _.mapKeys(obj, (value, key) => {
        return renamedFields[key];
      })
    );

    return replacedKeys;
  }

  async getStationDataByParameters(parameter, station) {
    const data = await this.get(
      `https://opendata-download-ocobs.smhi.se/api/version/latest/parameter/${parameter}/station/${station}/period/latest-day/data.json `
    );

    return data;
  }

  async getStationData(stationObjs) {
    const data = await Promise.all(
      stationObjs.map(x =>
        this.getStationDataByParameters(x.parameter, x.stationId)
      )
    );

    const remappedData = data.map(x => {
      return {
        stationId: x.station.key,
        stationName: x.station.name,
        readingName: x.parameter.name,
        readingUnit: x.parameter.unit,
        readingPeriod: x.period,
        readingValues: x.value
      };
    });

    console.log("DATA HERE", remappedData);

    return data;
  }
}

module.exports = { smhiAPI };
