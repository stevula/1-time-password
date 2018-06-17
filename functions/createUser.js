const admin = require('firebase-admin');

module.exports = function createUser(req, res) {
  if (!req.body.phone) {
    return res.status(422).send({ error: 'Missing phone number' });
  }

  const phone = String(req.body.phone).replace(/\D/g, '');

  return admin.auth().createUser({ uid: phone })
    .then(user => res.send(user))
    .catch(() => res.status(422).send({ error: 'User creation error' }));
};
