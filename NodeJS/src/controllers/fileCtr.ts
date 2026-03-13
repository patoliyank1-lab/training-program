import type { Request, Response } from "express";
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from "../utils/error.js";
import User from "../models/User.js";
import Post from "../models/Post.js";
import sharp from "sharp";
import path from "node:path";
const uploadDir = path.join(__dirname, "../../uploads");

export const avatarUpload = async (req: Request, res: Response) => {
  try {
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

    const user = await User.findByIdAndUpdate(
      req.user?.userId, // Filter
      { $set: { avatar: outputPath } }, // Update operation using $set
    ).lean();
    if (!user) throw new UnauthorizedError("this user not found.");
    const { password, ...OtherValues } = user;
    res.send(OtherValues);
  } catch (error) {
    throw new BadRequestError("user not found");
  }
};

export const postImageUpload = async (req: Request, res: Response) => {
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

  const userId = req.user?.userId;
  if (!userId) throw new UnauthorizedError("UserId not found.");
  const post = await Post.findOneAndUpdate(
    { _id: id, CreatedBy: userId }, // Filter
    { $set: { avatar: outputPath } }, // Update operation using $set
  ).lean();

  if (!post) throw new UnauthorizedError("this user not found.");

  if (image.size >= 5 * 1024 * 1024)
    throw new BadRequestError("image less then 5 MB");

  res.send(req.file);
};
