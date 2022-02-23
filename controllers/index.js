const router = require('express').Router();
const apiControllers = require('./api/');
const htmlRoutes = require('./html/html')

router.use('/api/', apiControllers);
router.use('/', htmlRoutes);

module.exports = router;