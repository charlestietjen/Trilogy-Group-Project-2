const router = require('express').Router();
const dashboardRoutes = require('./dashboardRoutes');
const homeRoutes = require('./home');

router.use('/dashboard', dashboardRoutes);
router.use('/', homeRoutes);


module.exports = router;
