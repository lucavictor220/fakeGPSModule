const express = require('express');
const fetch = require('node-fetch');
const fs = require('fs');
const parsePath = require('./utils/ParsePath');
const app = express();

app.get('/', (req, res) => res.send('Hello World!'));

app.get('/routes', (req, res) => {
  res.send('routes');
});

app.get('/routes/:id', (req, res) => {
  fetch(`https://www.eway.md/ajax/en/chisinau/routeInfo/${req.params.id}`, {
    headers: { 'X-Requested-With': 'XMLHttpRequest' }
  })
    .then(function(response) {
      return response.json();
    })
    .then(function(myJson) {
      console.log(myJson);
      res.send(myJson);
    });
});

app.get('/simulate/:id', (req, res) => {
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
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));