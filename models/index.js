const Post = require('./Post');
const User = require('./User');
const Like = require('./Like');

User.hasMany(Post, {
    foreignKey: 'user_id'
});

Post.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
});

Post.hasMany(Like, {
    foreignKey: 'post_id'
})

User.belongsToMany(Post, {
    through: Like,
    foreignKey: 'user_id'
});

Post.belongsToMany(User, {
    through: Like,
    foreignKey: 'post_id'
});

module.exports = { User, Post, Like };