import cheapRuler from 'cheap-ruler';

const ruler = cheapRuler(47.06, 'meters');

/** Converts numeric degrees to radians */
if (typeof(Number.prototype.toRadians) === "undefined") {
  Number.prototype.toRadians = function() {
    return this * Math.PI / 180;
  }
}

export const getDistance = (point1, point2) => {
  const R = 6371000; // earth Radius
  const lat1 = parseFloat(point1.latitude);
  const lon1 = parseFloat(point1.longitude);
  const lat2 = parseFloat(point2.latitude);
  const lon2 = parseFloat(point2.longitude);

  const fi1 = lat1.toRadians();
  const fi2 = lat2.toRadians();
  const deltaFi = (lat2-lat1).toRadians();
  const deltaAlpha = (lon2-lon1).toRadians();

  let a = Math.sin(deltaFi/2) * Math.sin(deltaFi/2) +
    Math.cos(fi1) * Math.cos(fi2) *
    Math.sin(deltaAlpha/2) * Math.sin(deltaAlpha/2);
  let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

  return R * c;
};

export const getCurrentDistance = (totalDistance, startTime, lapTime) => {
  // v = d/t
  const velocity = totalDistance / lapTime;
  const currentTime = new Date();
  const timeElapsedFromLastLapInSeconds = ((currentTime.getTime() - startTime.getTime()) / 1000) % lapTime;
  console.log(timeElapsedFromLastLapInSeconds);
  return timeElapsedFromLastLapInSeconds * velocity;
};

export const findPointIdBeforeDistance = (path, distance) => {
  let currentDistance = 0;
  for (let i = 0; i < path.length-1; i++) {
    console.log(path[i], path[i+1]);
    currentDistance += ruler.distance(path[i], path[i+1]);
    // get point at which the current distance accumulated by sum of segments is greater than given one;
    if (currentDistance > distance) return i;
  }
};

// expect array of array of point parsed as float
// optional param for the distance up to the n-th point
export const getRouteDistance = (path, n) => {
  // consider distance in meters
  const iterateBound = !!n ? n : path.length-1;
  let totalDistance = 0;
  for (let i = 0; i < iterateBound; i++) {
    totalDistance += ruler.distance(path[i], path[i+1]);
  }
  return totalDistance;
};

export const  getCurrentLocationFromPath = (transport, path, lapTime) => {
  const startTime = transport.createdDate;
  const totalDistance = getRouteDistance(path);
  const currentDistance = getCurrentDistance(totalDistance, startTime, lapTime);
  const idOfPointBeforeCurrentDistance = findPointIdBeforeDistance(path, currentDistance);
  const upToPointDistance = getRouteDistance(path, idOfPointBeforeCurrentDistance);
  const deltaDistance = currentDistance - upToPointDistance;
  const bearing = ruler.bearing(path[idOfPointBeforeCurrentDistance], path[idOfPointBeforeCurrentDistance+1]);
  console.log(path[idOfPointBeforeCurrentDistance]);
  return ruler.destination(path[idOfPointBeforeCurrentDistance], deltaDistance, bearing);
};