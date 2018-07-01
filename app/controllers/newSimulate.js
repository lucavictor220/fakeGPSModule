import pushCoordinates from '../utils/pushCoordinates';
import { parseSimulateBodyData } from '../utils/parse';
import { readFromLocalStorageByTypeAndNr } from '../utils/read';
import { getCurrentLocationFromPath, getRouteDistance } from '../utils/getDistance';
import { parseTransportData } from "../utils/parse";


const transportMarkers = [];
const TOTAL_TIME = 900; // one lap time in seconds

const fakeDataScheduleTransport = ({ transport, path, lapTime }) => {
  transportMarkers.push(transport);
  console.log('=======');
  console.log(transportMarkers);
  console.log('=======');

  setInterval(() => {
    const [ latitude, longitude ] = getCurrentLocationFromPath(transport, path, lapTime);
    const transportMarker = {
      ...transport,
      latitude,
      longitude,
    };
    pushCoordinates(transportMarker);
  }, 2000);
};

const newSimulate = (req, res) => {
  let error = '';
  console.log('DATA')
  const { nr, type, speed } = parseSimulateBodyData(req.body);
  console.log(nr, type, speed);
  const fileData = readFromLocalStorageByTypeAndNr(type, nr);
  if (!fileData.exist) {
    error = new Error(`Transport type: ${type} with nr ${nr} doesn't exist`)
    // bad data status
    return res.status(400).send(error)
  }
  let transportData = parseTransportData(fileData.data);
  transportData.lapTime = getRouteDistance(transportData.path) / speed;
  fakeDataScheduleTransport(transportData);
  res.status(200).send(`Transport type ${type} with nr ${nr} has been scheduled to move with speed ${speed} m/s`);
};

module.exports = newSimulate;
