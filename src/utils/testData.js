// Parameters
// 1 - Wave Height
// 5 - Sea Temperature
// 8 - Wave Direction
// 9 - Wave Period (Max)
// 10 - Wave Period (Average)
// 11 - Wave Height (Max)

[
  // Knolls Grund - Verified working: 1,5,8,9,10,11
  { stationId: "33008", parameter: "1" },
  { stationId: "33008", parameter: "5" },
  { stationId: "33008", parameter: "8" },
  { stationId: "33008", parameter: "9" },
  { stationId: "33008", parameter: "10" },
  { stationId: "33008", parameter: "11" },
  // Huvudskär Ost - Verified working: 1,5,9,11 - Not working: 5,10
  { stationId: "33002", parameter: "1" },
  { stationId: "33002", parameter: "5" },
  { stationId: "33002", parameter: "8" },
  { stationId: "33002", parameter: "10" },
  // Finngrundet WR - Verified working: 1,5,8,9,10,11
  { stationId: "33003", parameter: "1" },
  { stationId: "33003", parameter: "5" },
  { stationId: "33003", parameter: "8" },
  { stationId: "33003", parameter: "9" },
  { stationId: "33003", parameter: "10" },
  // Väderöarna WR - Verified working: 1,5,8,9,10,11
  { stationId: "33015", parameter: "1" },
  { stationId: "33015", parameter: "5" },
  { stationId: "33015", parameter: "8" },
  { stationId: "33015", parameter: "9" },
  { stationId: "33015", parameter: "10" },
  // Brofjorden WR - Verified working: 1,5,8,9,10,11
  { stationId: "33033", parameter: "1" },
  { stationId: "33033", parameter: "5" },
  { stationId: "33033", parameter: "8" },
  { stationId: "33033", parameter: "9" },
  { stationId: "33033", parameter: "10" }
];
