const admin = require('firebase-admin');
const { sanitizePhone } = require('./lib/utils');

module.exports = function createUser(req, res) {
  if (!req.body.phone) {
    return res.status(422).send({ error: 'Missing phone number' });
  }

  const phone = sanitizePhone(req.body.phone);

  return admin.auth().createUser({ uid: sanitizePhone(phone) })
    .then(user => res.send(user))
    .catch(() => res.status(422).send({ error: 'User creation error' }));
};
