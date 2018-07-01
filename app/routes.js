import express from 'express';
import indexController  from './controllers/index';
import allRoutesController from './controllers/allRoutes';
import routesController from './controllers/routes';
import simulateController from './controllers/simulate';
import scrapController from './controllers/scrap';
import newSimulateController from './controllers/newSimulate';

const router = express.Router();


router.get('/', indexController);

router.get('/routes', allRoutesController);

router.get('/scrap', scrapController);

router.get('/routes/:id/:type', routesController);

router.get('/simulate/:id/:speed', simulateController);

router.post('/simulate', newSimulateController);

export default router;


