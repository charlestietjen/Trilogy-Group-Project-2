const profanity = require('@2toad/profanity').profanity;
const badWords = require('./bad-words');

module.exports = {
   // Validates that email is in correct format
   validateEmail: email => {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regex.test(email);
   },
   // Validates that password consist of 6-16 characters, upper and lower case plus a special character
   validatePassword: password => {
      const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,16}$/;
   console.log('validater ran')
   return regex.test(password);
   },
   // Identifies profanity in post
   slangExists: string => {
      return profanity.exists(string);
   }
}