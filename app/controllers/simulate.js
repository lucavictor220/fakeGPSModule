const parsePath = require('../utils/ParsePath');
const pingCoordinates = require('../utils/pingCoordinates');
const fetch = require('node-fetch');

let USER_ID = 0;

const fakeDataScheduleTransport = (userId, transportNr, path) => {
  let current = 0;
  setInterval(() => {
    pingCoordinates(userId, transportNr, path[current]);
    current++;
    if(current === path.length) {
      current = 0;
    }
  }, 3000);
};

const simulateController = (req, res, next) => {
  fetch(`https://www.eway.md/ajax/en/chisinau/routeInfo/${req.params.id}`, {
    headers: { 'X-Requested-With': 'XMLHttpRequest' }
  })
    .then(function(response) {
      return response.json();
    })
    .then(function(myJson) {
      const forwardPathString = myJson.scheme.forward;
      const transportNr = parseInt(myJson.general.rn);
      const path = parsePath(forwardPathString);
      res.status(200).send(`Scheduled transport nr ${transportNr}`);
      fakeDataScheduleTransport(USER_ID, transportNr, path);
      USER_ID++;
      next();
    });
};

module.exports = simulateController;