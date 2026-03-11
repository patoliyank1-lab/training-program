import Post from "../models/Post.js";
import User from "../models/User.js";
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from "../utils/error.js";

interface newPost {
  title: string;
  description: string;
  image: string;
  userId: string;
}

export const PostService = {
  Save: async (post: newPost) => {
    if (!post.userId) throw new UnauthorizedError("this user is not define");

    const user = User.findById(post.userId);

    if (!user) throw new UnauthorizedError("this user is not define");

    const newPost = new Post({ CreatedBy: post.userId, ...post });
    return await newPost.save();
  },

  getAllPostByUserId: async (userId: string) => {
    if (!userId) throw new BadRequestError("User id not given.");
    let user;
    try {
      const mongoUser = await User.findOne({ _id: userId });
      user = mongoUser?.toObject();
    } catch (err) {
      throw new NotFoundError("user not found");
    }

    if (!user) throw new UnauthorizedError("this user is not define");

    const post = await Post.find({ CreatedBy: userId });

    if (!Number(post.length)) throw new NotFoundError("no post found");

    return post;
  },

  getAllPost: async () => {
    let posts;
    try {
      posts = await Post.find({});
    } catch (err) {
      throw new NotFoundError("post not found");
    }

    if (!posts) throw new Error("this is error");

    return Array.from(posts);
  },

  getPostById: async (id: string) => {
    console.log(id);

    if (!id) throw new BadRequestError("post id is not given.");

    const post = await Post.findById(id);

    if (!post) throw new NotFoundError("post not found.");
    return post;
  },

  update: async ({
    id,
    title,
    description,
    image,
  }: {
    id: string;
    title?: string;
    description?: string;
    image?: string;
  }) => {
    if (!id) throw new BadRequestError("post id is not defined.");

    let updatedPost;

    try {
      updatedPost = await Post.findByIdAndUpdate(
        id, // Filter
        { $set: { title, description, image } }, // Update operation using $set
      );
    } catch (error) {
      throw new NotFoundError("post not found.");
    }

    if (!updatedPost) throw new NotFoundError("post not found.");

    return updatedPost;
  },

  delete: async (id: string) => {
    if (!id) throw new BadRequestError("post id is not defined.");
    let deletePost;
    try {
       deletePost = await Post.deleteOne({_id:id});
    } catch (error) {
      throw new NotFoundError('Post not found.')
    } 

    return deletePost; 
  },
};
