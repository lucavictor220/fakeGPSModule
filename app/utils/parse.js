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
  if (!json.general || !json.scheme || !json.begin || !json.end) return false;
  // if (Object.keys(json.scheme) !== 2) return false;
  // if (!Array.isArray(json.stops)) return false;
  console.log('VALID DATA');
  return true;
};

export const parseTransportData = (json) => {
  if (!isValidRequestData(json)) {
    throw new Error('Invalid data');
  }
  return {
    transport: extractTransportMarkerData(json),
    forwardPath: parsePath(json.scheme.forward),
    backwardPath: parsePath(json.scheme.backward),
    path: parsePath(json.scheme.forward).concat(parsePath(json.scheme.backward))
  }
};