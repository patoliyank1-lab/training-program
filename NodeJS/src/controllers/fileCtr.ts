import type { Request, Response } from "express";
import { BadRequestError, UnauthorizedError } from "../utils/error.js";
import User from "../models/User.js";
import Post from "../models/Post.js";
import sharp from "sharp";
import path from "node:path";
import cloudinary from "../utils/cloudinaryConfig.js";
import { asyncHandler } from "../utils/asyncHandler.js";
const uploadDir = path.join("./uploads");

export const avatarUpload = asyncHandler(
  async (req: Request, res: Response) => {
    const image = req.file;
    if (!image) throw new BadRequestError("Image not Given.");
    if (image.size >= 5 * 1024 * 1024)
      throw new BadRequestError("image less then 5 MB");

    const filename = `${Date.now()}-resized.jpeg`;
    const outputPath = path.join(uploadDir, filename);

    await sharp(image.buffer)
      .resize(500, 200, {
        fit: sharp.fit.inside,
        withoutEnlargement: true,
      })
      .toFormat("jpeg", { quality: 80 })
      .toFile(outputPath);

    const result = await cloudinary.uploader.upload(outputPath);

    const user = await User.findByIdAndUpdate(
      req.user?.userId, // Filter
      { $set: { avatar: result.url } }, // Update operation using $set
    );
    const Obj = user?.toObject();
    if (!Obj) throw new UnauthorizedError("this user not found.");
    const { password: _password, ...OtherValues } = Obj;
    res.send(OtherValues);
  },
);

export const postImageUpload = asyncHandler(
  async (req: Request, res: Response) => {
    const id = req.query.id;

    if (!id) throw new BadRequestError("post id not found");
    const image = req.file;
    if (!image) throw new BadRequestError("Image not Given.");
    if (image.size >= 5 * 1024 * 1024)
      throw new BadRequestError("image less then 5 MB");

    const filename = `${Date.now()}-resized.jpeg`;
    const outputPath = path.join(uploadDir, filename);

    await sharp(image.buffer)
      .resize(500, 200, {
        fit: sharp.fit.inside,
        withoutEnlargement: true,
      })
      .toFormat("jpeg", { quality: 80 })
      .toFile(outputPath);
    const result = await cloudinary.uploader.upload(outputPath);

    const userId = req.user?.userId;
    if (!userId) throw new UnauthorizedError("UserId not found.");
    const post = await Post.findOneAndUpdate(
      { _id: id, CreatedBy: userId }, // Filter
      { $set: { image: result.url } }, // Update operation using $set
    );

    const Obj = post?.toObject();

    req.winLog.debug(result.url);
    if (!Obj) throw new UnauthorizedError("this user not found.");

    res.send(Obj);
  },
);
