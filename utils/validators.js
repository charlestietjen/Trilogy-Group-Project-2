const profanity = require('@2toad/profanity').profanity;

const badWords = require('./bad-words');

module.exports = {
   validateEmail: email => {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regex.test(email);
   },
   validatePassword: password => {
      const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,16}$/;
   console.log('validater ran')
   return regex.test(password);
   },
   slangExists: string => {
      return profanity.exists(string);
   }
}