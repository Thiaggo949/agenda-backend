const admin = require("firebase-admin");
const path = require("path");

// Caminho absoluto para o arquivo de chave do Firebase
const serviceAccount = require(path.resolve(__dirname, '../../firebase-service-account.json'));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://gerenciador-de-rotina-8246b.firebaseio.com"
});

module.exports = admin;
