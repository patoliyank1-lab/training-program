import axios from "axios";
import { BadRequestError, ConflictError, NotFoundError, UnauthorizedError } from '../utils/error.js'
import { asyncHandler } from "../utils/asyncHandler.js";

const json_url = process.env.JSON_URL ?? "http://localhost:4000"; // if can't get JSON_URL from .env then give default value.

/**
 * @description get all post.
 * @route GET /api/post
 * @route GET /api/post?userId=    // for get posts of particular user
 * @access Public
 */
const getAllPost = asyncHandler(async (req, res, next) => {
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
    })

/**
 * @description get single post data by id
 * @route GET /api/post/:id
 * @access Public
 */
const getPostById = asyncHandler(async (req, res, next) => {
    const id = req.params.id;

    if (!id || id === "")
        throw new BadRequestError("post id is undefined or not given.");
    const data = await axios.get(`${json_url}/post/${id}`)
        .then((value) => value.data)
        .catch((error) => {
            throw new NotFoundError('not found');
        });

    return res.status(200).json({
        success: true,
        status: 200,
        data: data,
    })
});

/**
 * @description create new product.
 * @route POST /api/post/
 * @access Login user
 */
const createNewPost = asyncHandler(async (req, res, next) => {
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

});

/**
 * @description update post by using post id .
 * @route PUT /api/post/:id
 * @access Login user
 */
const updatePostById = asyncHandler(async (req, res, next) => {
    const updatedPost = req.body;
    const id = req.params.id;


    if (!updatedPost) {
        throw new BadRequestError('post not defined')
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

});

/**
 * @description delete post by using post id .
 * @route DELETE /api/post/:id
 * @access Login user
 */
const deletePostById = asyncHandler(async (req, res, next) => {
    const id = req.params.id;

    if (!id || id === "")
        throw new BadRequestError('post id is undefined or not given.')

    // get post by id using json server
    await axios.delete(`${json_url}/post/${id}`)
        .then((value) => value.data)
        .catch(() => {
            throw new NotFoundError('post not found')
        });
    return res.status(200).json({
        success: true,
        status: 200,
        data: 'post deleted.',
    });
});

export {
    getAllPost,
    getPostById,
    updatePostById,
    deletePostById,
    createNewPost,
};
