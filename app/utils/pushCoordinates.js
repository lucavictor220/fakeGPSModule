import db from '../config/firebaseInit';

const pushCoordinates = (transport) => {
  console.log(transport);
  db.ref('markers/' + transport.id).set({...transport});
};

module.exports = pushCoordinates;
