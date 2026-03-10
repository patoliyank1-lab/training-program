import Post from "../models/Post.js";
import User from "../models/User.js";
import { BadRequestError, NotFoundError, UnauthorizedError } from "../utils/error.js";

interface newPost {
  title: string;
  description: string;
  image: string;
  userId: string
}

export const PostService = {


  Save: async (post: newPost) => {

    if (!post.userId) throw new UnauthorizedError('this user is not define')

    const user = User.findById(post.userId)

    if (!user) throw new UnauthorizedError('this user is not define')

    const newPost = new Post({ CreatedBy: post.userId, ...post })
    return await newPost.save()
  },

  getAllPostByUserId: async (userId: string) => {

    if (!userId) throw new BadRequestError('User id not given.')
      let user;

    /**@Error (when give wrong id then return Object<Any> not return null) */
      try {
        user = await User.findOne({_id:userId})
      } catch (error) {
        throw new NotFoundError('User not found.')
      }
      
    if (!user) throw new UnauthorizedError('this user is not define')

    const post = await Post.find({ CreatedBy: userId })

    if (!Number(post.length)) throw new NotFoundError('no post found')

    return post
  },

  getAllPost: async () => {

    console.log('1');
    
    const posts = await Post.find({});

    if(!posts) throw new Error('this is error')
  },

  getPostById: async (id: string) => {

    if (id) throw new BadRequestError('post id is not given.')

    const post = await Post.findById(id);

    if (!post) throw new NotFoundError('post not found.')
    return post;
  },


  update: async ({ id, title, description, image }: { id: string, title?: string, description?: string, image?: string }) => {

    if (!id) throw new BadRequestError('post id is not defined.')

    const updatedPost = await Post.findByIdAndUpdate(
      id, // Filter
      { $set: { title, description, image } } // Update operation using $set
    );

    if (!updatedPost) throw new NotFoundError('post not found.')

    return updatedPost
  },

  delete: async (id: string) => {
    if (id) throw new BadRequestError('post id is not defined.')

    return Post.findByIdAndDelete(id)
  }

};
