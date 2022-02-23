const router = require('express').Router();
const userController = require('./userController');
const postController = require('./postController');

router.use('/posts/', postController);
router.use('/users/', userController);

module.exports = router;