import { Request } from 'express';
import PostSchema from '../../models/Post.Schema';

export default class PostHandler {


    /**
     * @description Create new post 
     * @param {*} req as request
     */
    public static addingPost = async (req: Request) => {
        const post = new PostSchema({
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
    public static getAllPosts = async () => {
        try {
            const posts = await PostSchema.find();
            return posts;
        } catch (err) {
            throw new Error(err);
        }
    }

    /**
     * @description Get post by id (by query param)
     * @param {*} req as request
     */
    public static getPostById = async (req: Request) => {
        try {
            const post = await PostSchema.findById(req.query.postId);
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
    public static deletePost = async (req: Request) => {
        try {
            await PostSchema.remove({
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
    public static updatePost = async (req: Request) => {
        try {
            const updatedPost = await PostSchema.updateOne(
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

}
