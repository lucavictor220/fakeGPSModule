var fs = require('fs');
var moment = require('moment');

var PARSE_NR = 10;

var data = JSON.parse(fs.readFileSync('./data/stations_10.json', 'utf8'));
var parsed_data = {};

var routeStartTime = '5:40';
var routeEndTime = '11:15';
var minutesBetweenTrolleybuses = 10;
var timeBetweenStations = 3;


parsed_data[PARSE_NR] = {};
parsed_data[PARSE_NR].stops = {};
parsed_data[PARSE_NR].stops.forward = data.stops[0];
parsed_data[PARSE_NR].stops.backward = data.stops[1];
parsed_data[PARSE_NR].scheme = data.scheme;
parsed_data[PARSE_NR].begin = data.begin;
parsed_data[PARSE_NR].end = data.end;


function changeKeysOfStation(item) {
  var station = {};

  station.id = item.i;
  station.name = item.n;
  station.longitude = item.x;
  station.latitude = item.y;

  return station;
}

function createTimeScheduleArray(start, end) {
  var startTime = moment(start, 'HH:mm');
  var endTime = moment(end, 'HH:mm');
  var timeStops = [];

  while(startTime <= endTime){
    timeStops.push(new moment(startTime).format('HH:mm'));
    startTime.add(minutesBetweenTrolleybuses, 'minutes');
  }
  return timeStops;
}

var i = 0;
for (var prop in parsed_data[PARSE_NR].stops) {
  parsed_data[PARSE_NR].stops[prop] = data.stops[i].map(function(item) {
    var station = {};

    station = changeKeysOfStation(item);
    station.schedule = createTimeScheduleArray(routeStartTime, routeEndTime);
    currentStartTime = moment(routeStartTime, 'HH:mm');
    currentStartTime.add(timeBetweenStations, 'minutes');
    routeStartTime = currentStartTime.format('HH:mm');

    return station
  });

  i++;
}



var json = JSON.stringify(parsed_data);
//
fs.writeFile('./data/parsed/10_with_schedule.json', json, 'utf8', function (err) {
  if (err) {
    return console.log(err);
  }

  console.log("The file was saved!");
});



