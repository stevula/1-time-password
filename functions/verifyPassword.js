const admin = require('firebase-admin');
const { sanitizePhone } = require('./lib/utils');

module.exports = function verifyPassword(req, res) {
  if (!req.body.phone || !req.body.code) {
    return res.status(422).send({ error: 'Missing phone or code' });
  }

  const phone = sanitizePhone(req.body.phone);
  const code = parseInt(req.body.code, 10);

  return admin.auth().getUser(phone)
    .then(() => {
      const ref = admin.database().ref(`users/${phone}`);
      return ref.on('value', (snapshot) => {
        ref.off();
        const user = snapshot.val();

        if (user.code !== code || !user.codeValid) {
          return res.status(422).send({ error: `Invalid code for ${phone}`});
        }

        ref.update({ codeValid: false });

        return admin.auth().createCustomToken(phone)
      });
    })
    .then((token) => res.send({ token }))
    .catch(() => res.status(422).send({ error: 'Authentication failed'}));
};
