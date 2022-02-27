const profanity = require('@2toad/profanity').profanity;

const badWords = require('./bad-words');
exports.validateEmail = (email) => {
   const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
   return regex.test(email);
};

exports.validatePassword = (password) => {
   const regex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
   return regex.test(password);
};

exports.slangExists = (string) => {
   return profanity.exists(string);
};
