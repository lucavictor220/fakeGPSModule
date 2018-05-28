const fetch = require('node-fetch');

const routesController = (req, res) => {
  console.log(req.params);
  res.status(200).send(req.params);
  // fetch(`https://www.eway.md/ajax/en/chisinau/routeInfo/${req.params.id}`, {
  //   headers: { 'X-Requested-With': 'XMLHttpRequest' }
  // })
  //   .then(function(response) {
  //     return response.json();
  //   })
  //   .then(function(json) {
  //     console.log(json);
  //     res.status(200).send(json);
  //   });
};

module.exports = routesController;