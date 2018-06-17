exports.sanitizePhone = function sanitizePhone(phoneNumber) {
  return String(phoneNumber).replace(/\D/g, '');
};
