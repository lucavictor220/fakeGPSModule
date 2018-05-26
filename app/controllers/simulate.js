import pushCoordinates from '../utils/pushCoordinates';
import getRouteById from '../utils/getRouteById'
import { getCurrentLocationFromPath } from '../utils/getDistance';
import { readFromLocalStorageById } from '../utils/read';
import { parseTransportData } from "../utils/parse";
import fs from 'fs';
const PATH = 'app/data/';

const transportMarkers = [];
const TOTAL_TIME = 2000; // one lap time in seconds

const fakeDataScheduleTransport = ({ transport, path, lapTime }) => {
  transportMarkers.push(transport);
  console.log('=======');
  console.log(transportMarkers);
  console.log('=======');

  setInterval(() => {
    const [ latitude, longitude ] = getCurrentLocationFromPath(path, lapTime);
    const transportMarker = {
      ...transport,
      latitude,
      longitude,
    };
    pushCoordinates(transportMarker);
  }, 5000);
};



const simulateController = (req, res) => {
  const id = parseInt(req.params.id);
  let data = readFromLocalStorageById(id);
  if (data) {
    console.log('Local Storage get');
    let transportData = parseTransportData(data);
    transportData.lapTime = TOTAL_TIME;
    fakeDataScheduleTransport(transportData);
    return res.status(200).send('ok');
  }
  return getRouteById(id).then(json => {
    console.log('Remote get');
    const data = JSON.stringify(json);
    const path = PATH + id + '.json';
    fs.writeFileSync(path, data, 'utf8');
    const transportData = parseTransportData(json);
    transportData.lapTime = TOTAL_TIME;
    fakeDataScheduleTransport(transportData);
    res.status(200).send('ok');
  });
};

module.exports = simulateController;