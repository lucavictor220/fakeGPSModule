const simulateController = (req, res) => {
  fetch(`https://www.eway.md/ajax/en/chisinau/routeInfo/${req.params.id}`, {
    headers: { 'X-Requested-With': 'XMLHttpRequest' }
  })
    .then(function(response) {
      return response.json();
    })
    .then(function(myJson) {
      const forwardPathString = myJson.scheme.forward;
      const path = parsePath(forwardPathString);
      res.send(path);
    });
};

module.exports = simulateController;