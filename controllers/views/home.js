const router = require('express').Router();

router.get('/', (req, res) => {
    console.log('view route hit')
    res.render('landing')
});

router.get('/login', (req, res) => {
    console.log('login route')
    res.render('login');
});

module.exports = router;