const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Post, User, Like } = require('../../models');

//get all posts
router.get('/', (req, res) => {
    Post.findAll({
        // 
        attributes: ['id', 'text', 
        // [sequelize.literal('(SELECT COUNT(*) FROM like WHERE post.id = like.post_id)'), 'like_count']
        ],
        include: [{
            model: User,
            attributes: ['email']
        },
        {
            model: User,
            attributes: ['id'],
            through: Like,
            as: 'liked_posts'
        }]
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});
// get post by id
router.get('/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'text',
            'created_at'
            // [sequelize.literal('(SELECT COUNT(*) FROM like WHERE post.id = like.post_id)'), 'like_count']
        ],
        include: [
            {
                model: User,
                attributes: ['email']
            },           
            {
                model: User,
                attributes: ['id'],
                through: Like,
                as: 'liked_posts'
            }
        ]
    })
    .then(dbPostData => {
        if (!dbPostData){
            res.status(404).json({ message: 'Post not found' });
            return;
        }
        res.json(dbPostData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});
// create post, expects {text: "example post", user_id: 1}
router.post('/', (req, res) => {
    if(req.session) {
        Post.create({
            text: req.body.text,
            user_id: req.session.user_id
        })
        .then(dbPostData => res.json(dbPostData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    }
});
// like post
router.put('/like', (req, res) => {
    if (req.session) {
        Post.like({ ...req.body, user_id: req.session.user_id }, { Like, User })
        .then(updatedLikeData => res.json(updatedLikeData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    }
});
// edit post, expects {text: "updated example"}
router.put('/:id', (req, res) => {
    Post.update(
        {
            text: req.body.text
        },
        {
            where: {
                id: req.params.id
            }
        }
    )
    .then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({ message: 'Post not found' });
            return;
        }
        res.json(dbPostData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.delete('/:id', (req, res) => {
    console.log('id', req.params.id);
    Post.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({ message: 'Post not found' });
            return;
        }
        res.json(dbPostData);
    });
});

module.exports = router;