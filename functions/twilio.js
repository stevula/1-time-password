const twilio = require('twilio');
const { TWILIO_SID, TWILIO_AUTH_TOKEN } = require('./env');

module.exports = new twilio.Twilio(TWILIO_SID, TWILIO_AUTH_TOKEN);
