const Post = require('./Post');
const User = require('./User');
const Same = require('./Same');

User.hasMany(Post, {
    foreignKey: 'user_id'
});

Post.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
});

User.belongsToMany(Post, {
    through: Same,
    as: 'samed_posts',

    foreignKey: 'user_id',
    onDelete: 'SET NULL'
});

Post.belongsToMany(User, {
    through: Same,
    as: 'samed_posts',
    foreignKey: 'post_id',
    onDelete: 'SET NULL'
});

Same.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
});

Same.belongsTo(Post, {
    foreignKey: 'post_id',
    onDelete: 'SET NULL'
});

User.hasMany(Same, {
    foreignKey: 'post_id'
});

Post.hasMany(Same, {
    foreignKey: 'post_id'
});

module.exports = { User, Post, Same };