import Post from "../models/Post.js";
import User from "../models/User.js";
import type { reqQueryType } from "../types/Types.js";
import { Document } from 'mongoose';
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from "../utils/error.js";
import { Logger } from "../middlewares/logger.js";

interface newPost {
  title: string;
  description: string;
  image: string;
  userId: string;
}

  interface PaginatedPost {
    posts: Document[];
    total: number;
    limit: number;
    page: number;
    pages: number;
}

export const PostService = {
  Save: async (post: newPost) => {
    if (!post.userId) throw new UnauthorizedError("this user is not define");

    const user = User.findById(post.userId);

    if (!user) throw new UnauthorizedError("this user is not define");

    const newPost = new Post({ CreatedBy: post.userId, ...post });
    return await newPost.save();
  },


  getAllPost: async (reqQuery: reqQueryType) => {
    const { sortBy, page = 1, limit = 10, userId, likes } = reqQuery;

    const query: Record<string, any> = {};

    if (userId) {
      query.CreatedBy = userId;
    }

    if(likes){
       const [minLike, maxLike] = String(likes).split('-').map(Number);
       query.likesCount = { $gte: minLike, $lte: maxLike };
    }

    const options = {
      skip: (parseInt(page as string, 10) - 1) * parseInt(limit as string, 10),
      limit: parseInt(limit as string, 10),
      sort: sortBy === "asc" ? { title: 1 } : { title: -1 },
    };

    const posts = await Post.find(query, null , options);
    if (!posts) throw new Error("this is error");

    const total = await Post.countDocuments(query);
    const totalPages = Math.ceil(total / parseInt(limit as string, 10));
    const paginatedPost: PaginatedPost = {
            posts,
            total,
            limit: parseInt(limit as string, 10),
            page: parseInt(page as string, 10),
            pages: totalPages,
        };

    return paginatedPost;
  },

  getPostById: async (id: string) => {

    if (!id) throw new BadRequestError("post id is not given.");

    const post = await Post.findById(id);

    if (!post) throw new NotFoundError("post not found.");
    return post;
  },

  update: async ({
    id,
    title,
    description,
  }: {
    id: string;
    title?: string;
    description?: string;
  }) => {
    if (!id) throw new BadRequestError("post id is not defined.");
    let updatedPost;

    try {
      updatedPost = await Post.findByIdAndUpdate(
        id, // Filter
        { $set: { title, description } }, // Update operation using $set
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
      deletePost = await Post.deleteOne({ _id: id });
      if (deletePost.deletedCount == 0) {
        throw new NotFoundError("Post not found.");
      }
    } catch (error) {
      throw new NotFoundError("Post not found.");
    }

    return deletePost;
  },
};
