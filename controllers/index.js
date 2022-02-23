const router = require('express').Router();
const apiControllers = require('./api/');
const htmlRoutes = require('./html/html')

router.use('/api/', apiControllers);
router.use('/mockup', htmlRoutes);

module.exports = router;