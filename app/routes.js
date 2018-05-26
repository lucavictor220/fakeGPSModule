import express from 'express';
const router = express.Router();
import indexController  from './controllers/index';
import allRoutesController from './controllers/allRoutes';
import routesController from './controllers/routes';
import simulateController from './controllers/simulate';
import scrapController from './controllers/scrap';



router.get('/', indexController);

router.get('/routes', allRoutesController);

router.get('/scrap', scrapController);

router.get('/routes/:id', routesController);

router.get('/simulate/:id', simulateController);

export default router;


