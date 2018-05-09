const fetch = require('node-fetch');

const routesController = (req, res) => {
  fetch(`https://www.eway.md/ajax/en/chisinau/routeInfo/${req.params.id}`, {
    headers: { 'X-Requested-With': 'XMLHttpRequest' }
  })
    .then(function(response) {
      return response.json();
    })
    .then(function(myJson) {
      console.log(myJson);
      res.status(200).send(myJson);
    });
};

module.exports = routesController;