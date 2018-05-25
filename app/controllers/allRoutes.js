import scrapAllPublicTransportRoutesFromEwayApp from '../utils/scrapAllRoutes';

const allRountesController = (req, res) => {
  scrapAllPublicTransportRoutesFromEwayApp(res);
};

module.exports = allRountesController;