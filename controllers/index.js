const router = require('express').Router();
const apiControllers = require('./api/userController');

router.use('/api/', apiControllers);

module.exports = router;