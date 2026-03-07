import axios from "axios";

const json_url = process.env.JSON_URL ?? "http://localhost:4000"; // if can't get JSON_URL from .env then give default value.

/**
 * @description get all post.
 * @route GET /api/post
 * @route GET /api/post?userId=    // for get posts of particular user
 * @access Public
 *
 * @param {object} req - The request object (Express request object).
 * @param {object} res - The response object (Express response object).
 * @param {function} next - The Express next function.
 * @returns {void}
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

        throw next({ message: "Error to getting post.", statusCode: 400 });

    } catch (error) {
        return next(error);
    }
};


/**
 * @description get single post data by id
 * @route GET /api/post/:id
 * @access Public
 *
 * @param {object} req - The request object (Express request object).
 * @param {object} res - The response object (Express response object).
 * @param {function} next - The Express next function.
 * @returns {void}
 */
const getPostById = async (req, res, next) => {
    try {
        const id = req.params.id;

        if (!id || id === "")
            throw next({ message: "post id is undefined or not given.", statusCode: 400 });

        // get post by id using json server
        const post = await axios
            .get(`${json_url}/post/${id}`)
            .then((value) => value.data)
            .catch(() => {
                throw next({ message: "post not found.", statusCode: 404 })
            });


        if (post) return res.status(200).json({
            success: true,
            status: 200,
            data: post,
        });


        // if post not found then send error
        throw next({ message: "post not found.", statusCode: 404 });

    } catch (error) {
        return next(error)
    }
};

/**
 * @description create new product.
 * @route POST /api/post/
 * @access Login user
 *
 * @param {object} req - The request object (Express request object).
 * @param {object} res - The response object (Express response object).
 * @param {function} next - The Express next function.
 * @returns {void}
 */
const createNewPost = async (req, res, next) => {
    try {
        const { title, description, image, userId } = req.body;

        if (!title || !description || !image)
            throw next({ message: 'all filed must required', statusCode: 400 })

        if (!userId) throw next({ message: 'invalid User.', statusCode: 401 })

        const user = await axios
            .get(`${json_url}/user?id=${userId}`)
            .then((value) => value.data);

        if (user.length == 0) throw next({ message: 'invalid User.', statusCode: 401 })

        const post = {
            title,
            description,
            image,
            userId,
            createdAt: new Date().toISOString(),
        };

        axios.post(`${json_url}/post/`, post).then((value) => {
            return res.status(200).json({
                success: true,
                status: 200,
                data: post,
            });
        });
    } catch (error) {
        return next(error)
    }
};

/**
 * @description update post by using post id .
 * @route PUT /api/post/:id
 * @access Login user
 * @async
 *
 * @param {object} req - The request object (Express request object).
 * @param {object} res - The response object (Express response object).
 * @param {function} next - The Express next function.
 * @returns {void}
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

        throw next({ message: 'post not found', statusCode: 404 })
    } catch (error) {
        return next(error)
    }
};

/**
 * @description delete post by using post id .
 * @route DELETE /api/post/:id
 * @access Login user
 * @async
 *
 * @param {object} req - The request object (Express request object).
 * @param {object} res - The response object (Express response object).
 * @param {function} next - The Express next function.
 * @returns {void}
 */
const deletePostById = async (req, res, next) => {
    try {
        const id = req.params.id;

        if (!id || id === "")
            throw next({ message: 'post id is undefined or not given.', statusCode: 400 })

        // get post by id using json server
        const post = await axios
            .delete(`${json_url}/post/${id}`)
            .then((value) => value.data)
            .catch(() => {
                throw next({ message: 'post not found', statusCode: 404 })
            });
        if (post) return res.status(200).json({
            success: true,
            status: 200,
            data: 'post deleted.',
        });

        // if post not found then send error
        throw next({ message: 'post not found', statusCode: 404 })
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
