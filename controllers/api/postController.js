const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Post, User, Like } = require('../../models');
const withAuth = require('../../utils/auth');

//get all posts
router.get('/', (req, res) => {
    Post.findAll({
        // 
        attributes: ['id', 'text', 'category'],
        include: [{
            model: User,
            attributes: ['id']
        },
        {
            model: Like,
            attributes: ['user_id'],
        }
        ],
    })
    .then(dbPostData => {
        res.json(dbPostData)
    })
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
            'category',
            'created_at',
        ],
        include: [
            {
                model: User,
                attributes: ['email']
            },
            {
                model: Like,
                attributes: ['user_id'],
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
            user_id: req.body.user_id || req.session.user_id,
            category: req.body.category
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
        Like.create({
            user_id: req.body.user_id || req.session.user_id,
            post_id: req.body.post_id
        })
        .then(dbLikeData => res.json(dbLikeData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
    }
});
router.put('/unlike', (req, res) => {
    if (req.session) {
        Like.destroy({
            where: {
                user_id: req.body.user_id || req.session.user_id,
                post_id: req.body.post_id
            }
        })
        .then(dbLikeData => res.json(dbLikeData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    }
});
// edit post, expects {text: "updated example"}
router.put('/:id', withAuth, (req, res) => {
    Post.update(
        {
            text: req.body.text,
            category: req.body.category
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