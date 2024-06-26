const admin = require('firebase-admin');
const serviceAccount = require('../nawallah_firebase.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://fypparaiso.firebaseio.com"});

const db = admin.firestore();

module.exports = db;
