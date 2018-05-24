import fs from 'fs';
import fetch from "node-fetch";
import { parseTransportData } from "./parse";

const PATH = 'app/data/stations_10.json';

const getRouteById = (id) => {
  //TODO: check if route is already stored
  // for now manual check for trolik 10
  if (id === 9) {
    const data = JSON.parse(fs.readFileSync(PATH, 'utf8'));
    return parseTransportData(data);
  } else {
    fetch(`https://www.eway.md/ajax/en/chisinau/routeInfo/${id}`, {
      headers: { 'X-Requested-With': 'XMLHttpRequest' }
    })
      .then(function(response) {
        return response.json();
      })
      .then(function(json) {
        console.log('Request data from eway');
        return parseTransportData(json);
      });
  }
};

export default getRouteById;

