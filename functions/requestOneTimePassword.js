const admin = require('firebase-admin');
const twilio = require('./twilio');
const { FROM_PHONE_NUMBER } = require('./env');

module.exports = function requestOneTimePassword(req, res) {
  if (!req.body.phone) {
    return res.status(422).send({ error: 'Missing phone number' });
  }

  const phone = String(req.body.phone).replace(/\D/g, '');

  return admin.auth().getUser(phone)
    .then((user) => {
      const code = Math.floor(Math.random() * 8999 + 100);

      return twilio.messages.create({
        body: `Your code is ${code}`,
        to: phone,
        from: FROM_PHONE_NUMBER,
      }, (err) => {
        if (err) {
          return res.status(422).send({ error: err });
        }

        return admin.database().ref(`users/${phone}`)
          .update({ code, codeValid: true }, () => res.send({ success: true }));
      });
    })
    .catch(() => res.status(422).send({ error: 'User not found' }));
};
