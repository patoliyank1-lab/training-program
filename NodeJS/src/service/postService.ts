import Post from "../models/Post.js";
import User from "../models/User.js";
import type { reqQueryType } from "../types/Types.js";
import { Document } from "mongoose";
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from "../utils/error.js";

interface newPost {
  title: string;
  description: string;
  userId: string;
}

interface PaginatedPost {
  posts: Document[];
  total: number;
  limit: number;
  page: number;
  pages: number;
}

/**
 * contain Save, getAllPost, getPostById, update, delete services for posts.
 */
export const PostService = {
  /**
   * save new given post
   * @param post new post which is want to save.
   * @returns new created post.
   */
  Save: async (post: newPost) => {
    if (!post.userId) throw new UnauthorizedError("this user is not define");

    const user = User.findById(post.userId);

    if (!user) throw new UnauthorizedError("this user is not define");

    const newPost = new Post({ CreatedBy: post.userId, ...post });
    return await newPost.save();
  },

  /**
   * get all post by filter, userId, like in pagination format. 
   * @param reqQuery Request Query Object {sortBy, page = 1, limit = 10, userId, likes }
   * @returns return post in pagination format
   */
  getAllPost: async (reqQuery: reqQueryType) => {
    const { sortBy, page = 1, limit = 10, userId, likes } = reqQuery;

    const query: Record<string, any> = {};

    if (userId) {
      query.CreatedBy = userId;
    }

    if (likes) {
      const [minLike, maxLike] = String(likes).split("-").map(Number);
      query.likesCount = { $gte: minLike, $lte: maxLike };
    }

    const options = {
      skip: (parseInt(page as string, 10) - 1) * parseInt(limit as string, 10),
      limit: parseInt(limit as string, 10),
      sort: sortBy === "asc" ? { title: 1 } : { title: -1 },
    };

    const posts = await Post.find(query, null, options);
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

/**
 * find post by using post id.
 * @param id which post details want that post id
 * @returns return post 
 * @throws if post id is undefined or post not found then throw error.
 */
  getPostById: async (id: string) => {
    try {
      if (!id) throw new BadRequestError("post id is not given.");

      const post = await Post.findById(id);

      if (!post) throw new NotFoundError("post not found.");
      return post;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new NotFoundError("this post id is invalid");
    }
  },

  /**
   * update post using post id
   * @param  object -  {postId, title, description} details od post.
   * @returns 
   */
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
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new NotFoundError("post not found.");
    }

    if (!updatedPost) throw new NotFoundError("post not found.");

    return updatedPost;
  },

  /**
   * delete post by using post id.
   * @param id post id which post want to delete.
   * @returns return object which is show post id delete or not
   * @throws if Id is undefine then throw Error and When post not found then throw.
   */
  delete: async (id: string) => {
    if (!id) throw new BadRequestError("post id is not defined.");
    let deletePost;
    try {
      deletePost = await Post.deleteOne({ _id: id });
      if (deletePost.deletedCount == 0) {
        throw new NotFoundError("Post not found.");
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new NotFoundError("Post not found.");
    }

    return deletePost;
  },
};
