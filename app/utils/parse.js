import createTransport from "../models/transport";

const parsePath = (path) => {
  const arrayOfPoints = path.split(' ');
  return arrayOfPoints.map(item => {
    const coordinates = item.split(',');
    return [parseFloat(coordinates[0]), parseFloat(coordinates[1])]
  });
};

const extractTransportMarkerData = (json) => {
  const type = json.general.tn.toLowerCase();
  const nr = parseInt(json.general.rn);
  return createTransport({ type, nr })
};

const isValidRequestData = (json) => {
  return json.general && json.scheme && json.begin && json.end;
};

export const parseTransportData = (json) => {
  if (!isValidRequestData(json)) {
    throw new Error('Invalid data');
  }
  console.log('VALID DATA');
  return {
    transport: extractTransportMarkerData(json),
    forwardPath: parsePath(json.scheme.forward),
    backwardPath: parsePath(json.scheme.backward),
    path: parsePath(json.scheme.forward).concat(parsePath(json.scheme.backward))
  }
};

export const parseSimulateBodyData = ({ nr, type, speed }) => ({ nr: Number(nr), type, speed: Number(speed)});
