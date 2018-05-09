const admin = require('firebase-admin');
const serviceAccount = require("../../firebase-admin-credentials.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://thesis-1523375030198.firebaseio.com"
});

const db = admin.database();

const pingCoordinates = function(userId, transportNr, coordinates) {
  console.log('Ping coordinates: ', coordinates);
  const newChildRef = db.ref('markers/' + userId);
  newChildRef.set({
    nr: transportNr,
    latitude: parseFloat(coordinates.latitude),
    longitude: parseFloat(coordinates.longitude),
  })
};

module.exports = pingCoordinates;