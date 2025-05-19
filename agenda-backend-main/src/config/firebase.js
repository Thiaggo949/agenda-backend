const admin = require("firebase-admin");

// Em ambiente local, carregue o .env
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const serviceAccount = JSON.parse(process.env.FIREBASE_CONFIG);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://gerenciador-de-rotina-8246b.firebaseio.com"
});

module.exports = admin;

