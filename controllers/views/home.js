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
      const posts = dbPostData.map(post => {
        thisPost = post.get({ plain: true });
        if(thisPost.user_id == req.session.user_id) {
          thisPost.ownPost = true;
        } else {
          thisPost.ownPost = false;
        }

        return  thisPost;
      });
     
      res.render('landing', {
        posts,
        loggedIn: req.session.loggedIn || false,
        loggedIn_id: req.session.user_id
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});



module.exports = router;