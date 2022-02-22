const router = require('express').Router();
const apiControllers = require('./api/');

router.use('/api/', apiControllers);

module.exports = router;