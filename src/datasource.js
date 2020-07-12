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
}

module.exports = { smhiAPI };
