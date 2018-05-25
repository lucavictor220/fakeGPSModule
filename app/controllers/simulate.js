import pushCoordinates from '../utils/pushCoordinates';
import getRouteById from '../utils/getRouteById'
import { getCurrentLocationFromPath } from '../utils/getDistance';

const transportMarkers = [];
const TOTAL_TIME = 3600; // one lap time in seconds

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
  const transportData = getRouteById(id);
  transportData.lapTime = TOTAL_TIME;
  fakeDataScheduleTransport(transportData);
  res.status(200).send('ok');
};

module.exports = simulateController;