const router = require('express').Router();
const sequelize = require('../../config/connection');
const key = require('../../config/key');
const { User, Post, Like } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', withAuth, (req, res) => {
    Post.findAll({
      where: {
        user_id: req.session.user_id
      },
      attributes: ['id', 'text', 'user_id', 'created_at'],
      order: [['created_at', 'DESC']],
      include: {
        model: User,
        attributes: ['email']
      }
    })
    .then(dbPostData => {
      if (!req.session.key){
        req.session.save(() => {
          req.session.key = key;
        })
      };
      const posts = dbPostData.map(post => {
        thisPost = post.get({ plain: true });
        if(thisPost.user_id == req.session.user_id) {
          thisPost.ownPost = true;
        } else {
          thisPost.ownPost = false;
        }

        return  thisPost;
      });
      res.render('dashboard', {
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
