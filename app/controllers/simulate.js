import pushCoordinates from '../utils/pushCoordinates';
import getRouteById from '../utils/getRouteById'
import { getCurrentLocationFromPath } from '../utils/getDistance';

const transportMarkes = [];
const TOTAL_TIME = 3600; // one lap time in seconds

const fakeDataScheduleTransport = ({ transport, path }) => {
  let current = 0;
  transportMarkes.push(transport);
  console.log('=======');
  console.log(path[current]);
  console.log('=======');
  let { latitude, longitude } = path[current];
  setInterval(() => {
    const transportMarker = {
      ...transport,
      latitude,
      longitude,
    };
    pushCoordinates(transportMarker);
    const point1 = path[current];
    current++;
    const point2 = path[current];
    console.log('Current ' + current + 'Distance: ' + getDistance(point1, point2) + ' m');
    if(current === forwardPath.length) {
      current = 0;
    }
  }, 3000);
};

const simulateController = (req, res) => {
  const id = parseInt(req.params.id);
  const transportData = getRouteById(id);
  const point = getCurrentLocationFromPath(transportData.path, TOTAL_TIME);
  console.log('Interpolated point');
  console.log(point);
  console.log('Interpolated point');
  res.status(200).send('ok');
};

module.exports = simulateController;