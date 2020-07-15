# 🌊 SMHI GraphQL API (Unofficial)

## Motivation 🙌

This GraphQL API documents the Swedish Meteorological and Hydrological Institutes sea observations from multiple buoys surrounding the _Baltic Sea_, _Kattegat Strait_ and _Skagerrak strait_.

At the time of publishing, an Open Graphql API for the data provided by SMHI wasn't publicly available. Forecasting is currently unavailable as it is a paid feature of SMHI.

#### Current Data Available

| Station        | Wave Height (m) | Sea Temperature (°C) | Wave Period Max (s) | Wave Direction (°) | Wave Period Average (s) | Wave Height Max (m) |
| -------------- | --------------- | -------------------- | ------------------- | ------------------ | ----------------------- | ------------------- |
| Knolls Grund   | ✅              | ✅                   | ✅                  | ✅                 | ✅                      | ✅                  |
| Huvudskär Ost  | ✅              | ❌                   | ✅                  | ✅                 | ❌                      | ✅                  |
| Finngrundet WR | ✅              | ✅                   | ✅                  | ✅                 | ✅                      | ✅                  |
| Väderöarna WR  | ✅              | ✅                   | ✅                  | ✅                 | ✅                      | ✅                  |

## Usage 🔧

#### Endpoint: `https://smhi-graphql-api.herokuapp.com/graphql`

#### Example query

```javascript
// Query Knolls Grund station for Wave Height Average (m)
{
  stationReadings(stationObjs:[
	{stationId: "33008", parameter: "1"}
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

Queries can be made with two parameters:

- **stationId** - represents the station (see **Stations**)
- **parameter** - represents the field to request (see **Parameters**)

#### Stations 📟

A list of currently supported stations.
| Station Name | ID |
|--|--|
|Knolls Grund | 33008 |
|Huvudskär Ost | 33002 |
|Finngrundet WR | 33003 |
|Väderöarna WR | 33015 |
|Brofjorden WR | 33033 |

#### Parameters 🔍

Parameters used to fetch properties from the stations.

| Parameter               | ID  |
| ----------------------- | --- |
| Wave Height (m)         | 1   |
| Sea Temperature (°C)    | 5   |
| Wave Direction (°)      | 8   |
| Wave Period Max (s)     | 9   |
| Wave Period Average (s) | 10  |
| Wave Height Max (m)     | 11  |

#### Station Properties 📋

Properties you can query on.

| Property      | Type     |                                  |
| ------------- | -------- | -------------------------------- |
| stationId     | `STRING` |
| stationName   | `STRING` |
| parameterKey  | `Int`    |
| readingName   | `STRING` |
| readingUnit   | `STRING` |
| readingValues | `ARRAY`  | `{ value: FLOAT, date: STRING }` |
