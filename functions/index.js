const functions = require('firebase-functions');
const createUser = require('./createUser');
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');
const requestOneTimePassword = require('./requestOneTimePassword');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://one-time-pw-f135f.firebaseio.com'
});


exports.createUser = functions.https.onRequest(createUser);
exports.requestOneTimePassword = functions.https.onRequest(requestOneTimePassword);