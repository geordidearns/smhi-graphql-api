# 🌊 SMHI GraphQL API (Unofficial)

## 🙌 Motivation

This GraphQL API documents the Swedish Meteorological and Hydrological Institutes sea observations from multiple buoys surrounding the _Baltic Sea_, _Kattegat Strait_ and _Skagerrak strait_.

At the time of publishing, an Open Graphql API for the data provided by SMHI wasn't publicly available. Forecasting is currently unavailable as it is a paid feature of SMHI.

#### 🚧 Roadmap

- [ ] Error handling on unavailable data & incorrect input
- [x] Rate limiting & Depth limiting of queries
- [ ] Upgrade dynos to full-time for wider/frequent use
- [ ] Testing of endpoints and server
- [ ] Expanding of endpoints (Meteorological, Hydrological observations & forecasts)
- [ ] Health check endpoint

#### Current Data Available:

| Station        | Wave Height (m) | Sea Temperature (°C) | Wave Period Max (s) | Wave Direction (°) | Wave Period Average (s) | Wave Height Max (m) |
| -------------- | --------------- | -------------------- | ------------------- | ------------------ | ----------------------- | ------------------- |
| Knolls Grund   | ✅              | ✅                   | ✅                  | ✅                 | ✅                      | ✅                  |
| Huvudskär Ost  | ✅              | ❌                   | ✅                  | ✅                 | ❌                      | ✅                  |
| Finngrundet WR | ✅              | ✅                   | ✅                  | ✅                 | ✅                      | ✅                  |
| Väderöarna WR  | ✅              | ✅                   | ✅                  | ✅                 | ✅                      | ✅                  |

## 🔧 Usage

**NOTE:** This endpoint is on a free-tier Heroku dyno until further development is done to secure and test it - Thanks!

#### Endpoint: `https://smhi-graphql-api.herokuapp.com/graphql`

#### ➡️ Example query

```javascript
// Query Knolls Grund station for Wave Height Average (m)
{
  waveHeightAverage(stationInput:[
    {stationId: "33008", period: "latest-day"}
  ]) {
    stationId
    stationName
    parameterKey
    readingName
    readingUnit
    readingValues {
      value
      date
    }
  }
}
```

#### 🔊 Example response

```javascript
// Response querying Knolls Grund station for Wave Height Average (m)
{
  "data": {
    "waveHeightAverage": [
      {
        "stationId": "33008",
        "stationName": "KNOLLS GRUND BOJ",
        "parameterKey": 1,
        "readingName": "Våghöjd, signifikant 30 min",
        "readingUnit": "m",
        "readingValues": [
          {
            "value": 0.46,
            "date": "2020-07-15T21:00:00.000Z"
          }
        ]
      },
    ]
  }
}
```

Queries take an input of two parameters as an object in an array:

_Example:_ `[ {stationId: "33008", period: "latest-day"} ]`

- **stationId** - **(required)** - represents the station (see **Stations**)
- **period** - **(required)** - represents the period to request for (see **Period**)

#### 🔍 Queries

Parameters used to fetch properties from the stations.

| Query Name              | GraphQL Query Name |
| ----------------------- | ------------------ |
| Sea Temperature (°C)    | seaTemperature     |
| Wave Direction (°)      | waveDirection      |
| Wave Period Average (s) | wavePeriodAverage  |
| Wave Period Max (s)     | wavePeriodMax      |
| Wave Height Average (m) | waveHeightAverage  |
| Wave Height Max (m)     | waveHeightMax      |

#### 📟 Stations

A list of currently supported stations.
| Station Name | ID |
|--|--|
|Knolls Grund | 33008 |
|Huvudskär Ost | 33002 |
|Finngrundet WR | 33003 |
|Väderöarna WR | 33015 |
|Brofjorden WR | 33033 |

#### 🔍 Periods

Period is used to fetch properties within a time period.

| Period            | Key           |
| ----------------- | ------------- |
| Latest hour       | latest-hour   |
| Latest day        | latest-day    |
| Latest months     | latest-months |
| Corrected Archive | N/A           |

#### 📋 Station Properties & Response types

Properties you can query on.

| Property      | Type     | Nested properties                | Response Example                                    |
| ------------- | -------- | -------------------------------- | --------------------------------------------------- |
| stationId     | `STRING` |                                  | `"33008"`                                           |
| stationName   | `STRING` |                                  | `"KNOLLS GRUND BOJ"`                                |
| parameterKey  | `Int`    |                                  | `1`                                                 |
| readingName   | `STRING` |                                  | `"Våghöjd, signifikant 30 min"`                     |
| readingUnit   | `STRING` |                                  | `"m"`                                               |
| readingValues | `ARRAY`  | `{ value: FLOAT, date: STRING }` | `{ value: 0.33, date: "2020-07-14T09:00:00.000Z" }` |

## Contributions

Feel free to report issues, submit pull requests. To make roadmap requests please submit an issue.

## License

MIT © [Geordi](https://twitter.com/geordidearns)
