import fs from 'fs';
import fetch from "node-fetch";
import { parseTransportData } from "./parse";

const PATH = 'app/data/';

const getRouteById = (id) => {
  //TODO: check if route is already stored
  // for now manual check for trolik 10
  let path = PATH + id +'.json';
  console.log(path);
  if (id === 9) {
    console.log('Get from ');
    const data = JSON.parse(fs.readFileSync(path, 'utf8'));
    return parseTransportData(data);
  } else {
    fetch(`https://www.eway.md/ajax/en/chisinau/routeInfo/${id}`, {
      headers: { 'X-Requested-With': 'XMLHttpRequest' }
    })
      .then(function(response) {
        console.log(response);
        return response.json();
      })
      .then(function(json) {
        console.log('Request data from eway and write to local data store');
        console.log(json);
        console.log('Request data from eway and write to local data store');
        const data = JSON.stringify(json);
        fs.writeFileSync(path, data, 'utf8');
        return parseTransportData(json);
      });
  }
};

export default getRouteById;

