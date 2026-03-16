import { asyncHandler } from "../utils/asyncHandler.js";
import { PostService } from "../service/postService.js";
import { BadRequestError, UnauthorizedError } from "../utils/error.js";
import Post from "../models/Post.js";
import { likeFunction } from "../utils/like.js";
import type { reqQueryType } from "../types/Types.js";
import { deleteKeysByPattern, setCache } from "../config/redis.connect.js";

/**
 * @description get all post.
 * @route GET /api/post
 * @route GET /api/post?userId=    // for get posts of particular user
 * @access Public
 */
const getAllPost = asyncHandler(async (req, res) => {
  // for get one particular user's posts
  let { page, limit } = req.query;
  const { sortBy, userId, likes } = req.query;

  if (limit === "") limit = undefined;
  if (page === "") page = undefined;

  const reqQuery: reqQueryType = {
    sortBy: sortBy as string | undefined,
    page: page as string | undefined,
    limit: limit as string | undefined,
    userId: userId as string | undefined,
    likes: likes as string | undefined,
  };

  const post = await PostService.getAllPost(reqQuery);

  setCache(req.originalUrl, {
    success: true,
    status: 200,
    data: post,
  });

  return res
    .status(200)
    .cookie(
      "secret",
      { secret: "secret" },
      {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
      },
    )
    .json({
      success: true,
      status: 200,
      data: post,
    });
});

/**
 * @description get single post data by id
 * @route GET /api/post/:id
 * @access Public
 */
const getPostById = asyncHandler(async (req, res) => {
  const id = req.params.id as string;

  const post = await PostService.getPostById(id);

  res.send({
    success: true,
    statusCode: 200,
    data: post,
  });
});

/**
 * @description create new product.
 * @route POST /api/post/
 * @access Login user
 */
const createNewPost = asyncHandler(async (req, res) => {
  const { title, description, image } = req.body;

  const response = await PostService.Save({
    title,
    description,
    image,
    userId: req.user?.userId as string,
  });
  deleteKeysByPattern(req.baseUrl);
  if (response)
    return res.status(200).json({
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
const updatePostById = asyncHandler(async (req, res) => {
  const { title, description } = req.body;
  const id: string = req.params.id as string;

  // get post by id using json server
  const post = await PostService.update({ id, title, description });
  deleteKeysByPattern(req.baseUrl);
  if (post)
    return res.status(200).json({
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
const deletePostById = asyncHandler(async (req, res) => {
  const id = req.params.id as string;

  const response = await PostService.delete(id);
  deleteKeysByPattern(req.baseUrl);

  if (response)
    return res.status(200).json({
      success: true,
      status: 200,
      data: "post successfully delete.",
    });
});

const likePost = asyncHandler(async (req, res) => {
  const user = req.user;
  if (!user) throw new UnauthorizedError("Unauthorized Parson.");
  //Post id
  const id = req.params.id as string;

  if (!id || typeof id != "string")
    throw new UnauthorizedError("Unauthorized Parson.");

  const posts = await Post.findById(id).lean();
  if (!posts) throw new BadRequestError("incorrect post id.");

  const likeArray = likeFunction(
    posts.likes.map((x) => x.toString()),
    user.userId,
  );

  const post = await Post.findByIdAndUpdate(id, {
    $set: { likes: likeArray.likeArray, likesCount: likeArray.length },
  }).lean();

  if (!post) throw new BadRequestError("incorrect post id.");

  deleteKeysByPattern("/api/post");
  res.json({
    success: true,
    status: 200,
    data: `${post._id} likes by you !!`,
  });
});

const removeLikePost = asyncHandler(async (req, res) => {
  const user = req.user;
  if (!user) throw new UnauthorizedError("Unauthorized Parson.");
  //Post id
  const id = req.params.id as string;

  if (!id || typeof id != "string")
    throw new UnauthorizedError("Unauthorized Parson.");

  const posts = await Post.findById(id).lean();

  if (!posts) throw new BadRequestError("incorrect post id.");

  const likeArray = likeFunction(
    posts.likes.map((x) => x.toString()),
    user.userId,
    false,
  );

  const post = await Post.findByIdAndUpdate(id, {
    $set: { likes: likeArray.likeArray, likesCount: likeArray.length },
  }).lean();

  if (!post) throw new BadRequestError("incorrect post id.");
  deleteKeysByPattern("/api/post");
  res.json({
    success: true,
    status: 200,
    data: `remove likes by from  ${post.title} !!`,
  });
});

export {
  getAllPost,
  getPostById,
  updatePostById,
  deletePostById,
  createNewPost,
  likePost,
  removeLikePost,
};
