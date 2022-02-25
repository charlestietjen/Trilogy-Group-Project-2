const router = require('express').Router();

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
  
    res.render('login');
  });
  
router.get('/', (req, res) => {
    console.log('view route hit')
    res.render('landing')
});



module.exports = router;