const router = require('express').Router();
const sequelize = require('../../config/connection');
const { User, Post, Like, Hide } = require('../../models/');

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
      order: [['created_at', 'DESC']],
      include: [{
        model: User,
        attributes: ['email']
      },
      {
        model: Like,
        attributes: ['user_id'],
     },
      {
        model: Hide,
      }]
    })
    .then(dbPostData => {
      dbPostData = dbPostData.filter(arr => {
        if (arr.hides.some(h => h.user_id === req.session.user_id)){
        return;
    }
        return arr;
    })
      const posts = dbPostData.map(post => {
        thisPost = post.get({ plain: true });
        if(thisPost.user_id == req.session.user_id) {
          thisPost.ownPost = true;
        } else {
          thisPost.ownPost = false;
        }
        if(thisPost.likes.some(l => l.user_id === req.session.user_id)){
          thisPost.likedPost = true;
        } else {
          thisPost.likedPost = false;
        }

        return  thisPost;
      });
      res.render('landing', {
        posts,
        loggedIn: req.session.loggedIn,
        loggedIn_id: req.session.user_id
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});



module.exports = router;