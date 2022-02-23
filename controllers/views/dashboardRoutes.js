const router = require('express').Router();

router.get('/', (res, req) => {
    res.render('landing')
});

module.exports = router;