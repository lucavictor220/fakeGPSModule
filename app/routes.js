const express = require('express');
const router = express.Router();
const indexController = require('./controllers/index')
const allRoutesController = require('./controllers/allRoutes');
const routesController = require('./controllers/routes');
const simulateController = require('./controllers/simulate');

const parsePath = require('./utils/ParsePath');

router.get('/', indexController);

router.get('/routes', allRoutesController);

router.get('/routes/:id', routesController);

router.get('/simulate/:id', simulateController);

module.exports = router;

