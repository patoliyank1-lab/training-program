import { asyncHandler } from "../utils/asyncHandler.js";
import { PostService } from '../service/postService.js';

/**
 * @description get all post.
 * @route GET /api/post
 * @route GET /api/post?userId=    // for get posts of particular user
 * @access Public
 */
const getAllPost = asyncHandler(
    async (req, res, next) => {
        // for get one particular user's posts
        const userId = req.query.userId as string;
        let post;  

        if(userId){
            post =  await PostService.getAllPostByUserId(userId);
        }else{
            post =  await PostService.getAllPost()
        }
        

        


        return res.status(200).json({
            success: true,
            status: 200,
            data: post,
        });
    })


/**
 * @description get single post data by id
 * @route GET /api/post/:id
 * @access Public
 */
const getPostById = asyncHandler(
    async (req, res, next) => {
        const id = req.params.id as string;

        const post = await PostService.getPostById(id);

        res.send({
            success: true,
            statusCode: 200,
            data: post
        })

    });

/**
 * @description create new product.
 * @route POST /api/post/
 * @access Login user
 */
const createNewPost = asyncHandler(async (req, res, next) => {
    const { title, description, image } = req.body;
    

    const response = await PostService.Save({ title, description, image, userId:(req.user?.userId as string) });

    if (response) return res.status(200).json({
        success: true,
        status: 200,
        data: response,
    });
});

/**
 * @description update post by using post id .
 * @route PUT /api/post/:id
 * @access Login user
 */
const updatePostById = asyncHandler(async (req, res, next) => {
    const { title, description, image} = req.body;
    const id:string = req.params.id as string;

    // get post by id using json server
    const post = await PostService.update({id, title, description, image})

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
    const id = req.params.id as string;

const response = await PostService.delete(id)

if(response) return res.status(200).json({
        success: true,
        status: 200,
        data: 'post successfully delete.',
    });
});

export {
    getAllPost,
    getPostById,
    updatePostById,
    deletePostById,
    createNewPost,
};
