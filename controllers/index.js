const router = require('express').Router();
const apiControllers = require('./api/userController');
const htmlRoutes = require('./html//html')

router.use('/api/', apiControllers);
router.use('/', htmlRoutes);

module.exports = router;