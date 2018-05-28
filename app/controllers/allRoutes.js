import db from '../config/firebaseInit';

const allRountesController = (req, res) => {
  return db.ref('markers/').once('value').then(function(snapshot) {
    let transportMarkers = snapshot.val();
    transportMarkers = Object.values(transportMarkers)
    transportMarkers = transportMarkers.map(item => {
      return {
        id: item.id,
        type: item.type,
        speed: 20,
      }
    });
    console.log(transportMarkers);
    res.status(200).send(transportMarkers);
  });
};

module.exports = allRountesController;
