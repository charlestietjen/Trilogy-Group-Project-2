const router = require('express').Router();
const sequelize = require('../../config/connection');
const { User, Post, Like } = require('../../models/');

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
  
    res.render('login');
  });
  
router.get('/', (req, res) => {
    Post.findAll({
      attributes: ['id', 'text', 'user_id', 'created_at'],
      include: {
        model: User,
        attributes: ['email']
      }
    })
    .then(dbPostData => {
      const posts = dbPostData.map(post => post.get({ plain: true }));
      console.log(posts)
      res.render('landing', {
        posts,
        loggedIn: req.session.loggedIn || false
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});



module.exports = router;