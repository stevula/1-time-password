const functions = require('firebase-functions');
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');
const createUser = require('./createUser');
const requestAccessCode = require('./requestAccessCode');
const verifyAccessCode = require('./verifyAccessCode');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://one-time-pw-f135f.firebaseio.com'
});


exports.createUser = functions.https.onRequest(createUser);
exports.requestAccessCode = functions.https.onRequest(requestAccessCode);
exports.verifyAccessCode = functions.https.onRequest(verifyAccessCode);