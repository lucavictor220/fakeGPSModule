const admin = require('firebase-admin');
const serviceAccount = require("../../firebase-admin-credentials.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://thesis-1523375030198.firebaseio.com"
});

const db = admin.database();

const pushCoordinates = (transport) => {
  console.log('Marker data: ', transport);
  db.ref('markers/' + transport.id).set({...transport});
};

module.exports = pushCoordinates;