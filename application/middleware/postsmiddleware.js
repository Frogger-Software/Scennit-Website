var { getNRecentPosts, getPostById } = require('../models/Posts');
const { getCommentsForPost } = require('../models/Comments');
const postMiddleware = {};

postMiddleware.getRecentPosts = async function (req, res, next) {
    try {
        let results = await getNRecentPosts(8);
        res.locals.results = results;
        if (results.length == 0) {
            req.flash('error', 'there are no posts created yet');
        }
        next();
    } catch (err) {
        next(err);
    }
}

postMiddleware.getPostById = async function (req, res, next) {
    try {
        let postId = req.params.id;
        let results = await getPostById(postId);
        if (results && results.length) {
            res.locals.currentPost = results[0];
            next();
        } else {
            res.flash('error', 'this is not the post you are looking for');
            req.session.save( err => {
                res.redirect('/');
            })
        }
    } catch (err) {
        next(err);
    }
}

postMiddleware.getCommentsByPostId = async function (req, res, next) {
    let postId = req.params.id;
    try {
        let results = await getCommentsForPost(postId);
        res.locals.currentPost.comments = results;
        next();
    } catch (err) {
        next(err);
    }
}

module.exports = postMiddleware;