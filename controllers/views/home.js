const router = require('express').Router();

router.get('/', (req, res) => {
    console.log('view route hit')
    res.render('landing')
});

module.exports = router;