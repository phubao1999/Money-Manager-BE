const Post = require('../../models/Post');

/**
 * @description Create new post 
 * @param {*} req as request
 */
const addingPost = async req => {
    const post = new Post({
        title: req.body.title,
        description: req.body.description
    });

    try {
        const savedPost = await post.save();
        return savedPost;
    } catch (err) {
        throw new Error(err);
    }
}


/**
 * @description Get all posts
 */
const getAllPosts = async () => {
    try {
        const posts = await Post.find();
        return posts;
    } catch (err) {
        throw new Error(err);
    }
}

/**
 * @description Get post by id (by query param)
 * @param {*} req as request
 */
const getPostById = async req => {
    try {
        const post = await Post.findById(req.query.postId);
        return post;
    } catch (err) {
        throw new Error(err);
    }
};

/**
 * 
 * @description delete post by id (by query param)
 * @param {*} req 
 */
const deletePost = async req => {
    try {
        await Post.remove({
            _id: req.query.postId
        });
        return 'Delete Susscesfully';
    } catch (err) {
        throw new Error(err);
    }
}

/**
 * 
 * @description delete post by id (by query param)
 * @param {*} req
 */
const updatePost = async req => {
    try {
        const updatedPost = await Post.updateOne(
            { _id: req.query.postId },
            {
                $set: {
                    title: req.body.title,
                    description: req.body.description,
                    date: Date.now()
                }
            }
        );
        return updatedPost;
    } catch (err) {
        throw new Error(err.message);
    }
}

module.exports = {
    addingPost,
    getAllPosts,
    getPostById,
    deletePost,
    updatePost
};