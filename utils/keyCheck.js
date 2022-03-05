const key = require('../config/key');

const keyCheck = (req, res, next) => {
    if (!req.session.key){
        console.log(req.session.key, key, 'Key invalid');
        res.status(403).json({ message: 'External access not available' });
    } else {
        console.log(req.session.key, key, 'key valid');
        next();
    }
};

module.exports = keyCheck;