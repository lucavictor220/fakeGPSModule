let fs = require('fs');
let moment = require('moment');

let PARSE_NR = 10;

let data = JSON.parse(fs.readFileSync('./data/9.json', 'utf8'));
let parsed_data = {};

let routeStartTime = '5:40';
let routeEndTime = '11:15';
let minutesBetweenTrolleybuses = 10;
let timeBetweenStations = 3;


parsed_data[PARSE_NR] = {};
parsed_data[PARSE_NR].stops = {};
parsed_data[PARSE_NR].stops.forward = data.stops[0];
parsed_data[PARSE_NR].stops.backward = data.stops[1];
parsed_data[PARSE_NR].scheme = data.scheme;
parsed_data[PARSE_NR].begin = data.begin;
parsed_data[PARSE_NR].end = data.end;


function changeKeysOfStation(item) {
  let station = {};

  station.id = item.i;
  station.name = item.n;
  station.longitude = item.x;
  station.latitude = item.y;

  return station;
}

function createTimeScheduleArray(start, end) {
  let startTime = moment(start, 'HH:mm');
  let endTime = moment(end, 'HH:mm');
  let timeStops = [];

  while(startTime <= endTime){
    timeStops.push(new moment(startTime).format('HH:mm'));
    startTime.add(minutesBetweenTrolleybuses, 'minutes');
  }
  return timeStops;
}

let i = 0;
for (let prop in parsed_data[PARSE_NR].stops) {
  parsed_data[PARSE_NR].stops[prop] = data.stops[i].map(function(item) {
    let station = {};

    station = changeKeysOfStation(item);
    station.schedule = createTimeScheduleArray(routeStartTime, routeEndTime);
    currentStartTime = moment(routeStartTime, 'HH:mm');
    currentStartTime.add(timeBetweenStations, 'minutes');
    routeStartTime = currentStartTime.format('HH:mm');

    return station
  });

  i++;
}



let json = JSON.stringify(parsed_data);
//
fs.writeFile('./data/parsed/10_with_schedule.json', json, 'utf8', function (err) {
  if (err) {
    return console.log(err);
  }

  console.log("The file was saved!");
});



