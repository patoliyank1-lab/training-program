import axios from "axios";
import { BadRequestError, ConflictError, NotFoundError, UnauthorizedError } from '../utils/error.js'

const json_url = process.env.JSON_URL ?? "http://localhost:4000"; // if can't get JSON_URL from .env then give default value.

/**
 * @description get all post.
 * @route GET /api/post
 * @route GET /api/post?userId=    // for get posts of particular user
 * @access Public
 */
const getAllPost = async (req, res, next) => {
    try {
        // for get one particular user's posts
        const { userId } = req.query;
        if (userId) {
            const post = await axios
                .get(`${json_url}/post?userId=${userId}`)
                .then((value) => value.data);
            return res.status(200).json({
                success: true,
                status: 200,
                data: post,
            });
        }

        // if not given search prams then give all posts.
        const allPost = await axios
            .get(`${json_url}/post`)
            .then((value) => value.data);

        if (allPost)
            return res.status(200).json({
                success: true,
                status: 200,
                data: allPost,
            });
        if (!res.headersSent)
            throw new BadRequestError("Error to getting post.");

    } catch (error) {
        return next(error);
    }
};

/**
 * @description get single post data by id
 * @route GET /api/post/:id
 * @access Public
 */
const getPostById = async (req, res, next) => {
    try {
        const id = req.params.id;

        if (!id || id === "")
            throw new BadRequestError("post id is undefined or not given.");

        // get post by id using json server
        axios.get(`${json_url}/post/${id}`)
            .then((value) => value.data)
            .then(value => {
                return res.status(200).json({
                    success: true,
                    status: 200,
                    data: value,
                });
            })
            .catch(() => {
                throw new NotFoundError("post not found.")
            });

        if (!res.headersSent)
            throw new BadRequestError("post not found.")

    } catch (error) {
        return next(error)
    }
};

/**
 * @description create new product.
 * @route POST /api/post/
 * @access Login user
 */
const createNewPost = async (req, res, next) => {
    try {
        const { title, description, image, userId } = req.body;

        if (!title || !description || !image)
            throw new BadRequestError('all filed must required')

        if (!userId) throw new UnauthorizedError('invalid User.')

        const user = await axios
            .get(`${json_url}/user?id=${userId}`)
            .then((value) => value.data);

        if (user.length == 0) throw new UnauthorizedError('invalid User.')

        const post = {
            title,
            description,
            image,
            userId,
            createdAt: new Date().toISOString(),
        };
        // create post 
        axios.post(`${json_url}/post/`, post).then((value) => {
            return res.status(200).json({
                success: true,
                status: 200,
                data: post,
            });
        });

        if (!res.headersSent)
            throw new BadRequestError("error to create new post try again.")
    } catch (error) {
        return next(error)
    }
};

/**
 * @description update post by using post id .
 * @route PUT /api/post/:id
 * @access Login user
 */
const updatePostById = async (req, res, next) => {
    try {
        const updatedPost = req.body;
        const id = req.params.id;



        if (!updatedPost) {
            throw next({ message: 'post not defined', statusCode: 400 })
        }

        // get post by id using json server
        const post = await axios
            .patch(`${json_url}/post/${id}`, updatedPost)
            .then((value) => value.data)
            .catch(() => {
                throw next({ message: 'post not found', statusCode: 404 })
            });

        if (post) return res.status(200).json({
            success: true,
            status: 200,
            data: post,
        });
        if (!res.headersSent)
            throw next({ message: 'post not found', statusCode: 404 })
    } catch (error) {
        return next(error)
    }
};

/**
 * @description delete post by using post id .
 * @route DELETE /api/post/:id
 * @access Login user
 */
const deletePostById = async (req, res, next) => {
    try {
        const id = req.params.id;

        if (!id || id === "")
            throw new BadRequestError('post id is undefined or not given.')

        // get post by id using json server
        axios.delete(`${json_url}/post/${id}`)
            .then((value) => value.data)
            .then(() => {
                return res.status(200).json({
                    success: true,
                    status: 200,
                    data: 'post deleted.',
                });
            })
            .catch(() => {
                throw NotFoundError('post not found')
            });

        if (!res.headersSent)
            throw new NotFoundError("post not found")

    } catch (error) {
        return next(error)
    }
};

export {
    getAllPost,
    getPostById,
    updatePostById,
    deletePostById,
    createNewPost,
};
