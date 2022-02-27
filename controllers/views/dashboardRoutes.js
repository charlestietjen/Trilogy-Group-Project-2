const router = require('express').Router();
const sequelize = require('../../config/connection');
const { User, Post, Like } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/dashboard', withAuth, (req, res) => {
    Post.findAll({
        where: {
            user_id: req.session.user_id
        },
        attributes: ['id', 'text', 'user_id', 'created_at'],
        include: {
        model: User,
        attributes: ['email']
      }
    })
    .then(dbPostData => {
      const posts = dbPostData.map(post => post.get({ plain: true }));
      res.render('dashboard', {
        posts,
        loggedIn: req.session.LoggedIn
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;