const router = require('express').Router();
const apiControllers = require('./api/');
const htmlRoutes = require('./html/html');
const viewsRoutes = require('./views/')

router.use('/api/', apiControllers);
router.use('/mockup', htmlRoutes);
router.use('/', viewsRoutes);

module.exports = router;