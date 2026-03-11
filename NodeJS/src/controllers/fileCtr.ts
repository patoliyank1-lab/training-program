import type { Request, Response } from "express";
import { BadRequestError, NotFoundError, UnauthorizedError } from "../utils/error.js";
import User from "../models/User.js";
import Post from "../models/Post.js";

export const avatarUpload = async (req: Request, res: Response) => {
    try {
        const image = req.file;
        if (!image) throw new BadRequestError("Image not Given.");
        if (image.size >= 5 * 1024 * 1024) throw new BadRequestError('image less then 5 MB')
        const mongoUser = await User.findByIdAndUpdate(
            req.user?.userId, // Filter
            { $set: { avatar: image.path } }, // Update operation using $set
        )
        const user = mongoUser?.toObject()
        if (!user) throw new UnauthorizedError('this user not found.')
        const { password, ...OtherValues } = user
        res.send(OtherValues);
    } catch (error) {
        throw new BadRequestError('user not found')
    }
};

export const postImageUpload = async(req: Request, res: Response) => {
  
    const id  = req.query.id;

    if (!id) throw new BadRequestError('post id not found')
    const image = req.file;
    if (!image) throw new BadRequestError("Image not Given.");

    try{

        const MongoPost = await Post.findById(id);
        const MPost = MongoPost?.toObject();
        
        if(MPost?.CreatedBy != req.user?.userId ){
            throw new UnauthorizedError("this post can not delete by You. d")
        }
        }catch(error:any){
            throw new UnauthorizedError(error.message)
        }


      let mongoUser:unknown = {};
      try {
        mongoUser = await Post.findByIdAndUpdate(
            id, // Filter
            { $set: { avatar: image.path } }, // Update operation using $set
        )
      } catch (error) {
        throw new NotFoundError('post not found.')
      }
      
        const post = mongoUser
        if (!post) throw new UnauthorizedError('this user not found.')


    if (image.size >= 5 * 1024 * 1024) throw new BadRequestError('image less then 5 MB')

    res.send(req.file);

 
};
