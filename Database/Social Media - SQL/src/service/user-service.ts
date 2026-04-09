import { prisma } from "../config/database-connection.js";
import {
  type ProfileType,
  type RankUserType,
  type SettingType,
  type TopPostByLikes,
  type UsernameAndPostName,
} from "../types/Types.js";
import { AppError, UnknownError } from "../utils/errorHandler.js";

/**
 * create user Profile with default setting and stats
 * @param profileDetails user details with userId
 * @returns return object of profile, setting, stats's details
 */
export const createProfile = async (profileDetails: ProfileType) => {
  try {
    // create profile.
    const profile = await prisma.userProfile.create({
      data: profileDetails,
    });
    const setting = await prisma.userSettings.create({
      data: { userId: profileDetails.userId },
    });
    const stats = await prisma.userStats.create({
      data: { userId: profileDetails.userId },
    });
    return { profile, setting, stats };
  } catch (error) {
    throw new UnknownError(error);
  }
};

/**
 * update user's details
 * @param setting user's setting details
 */
export const updateSetting = async (setting: SettingType) => {
  try {
    const { userId, ...rest } = setting;
    if (!setting.userId || Object.keys(setting).length === 1)
      throw new AppError("Minimum 1 setting details given ", 400);

    const newSetting = await prisma.userSettings.update({
      where: { userId: userId },
      data: rest,
    });
    return newSetting;
  } catch (error) {
    throw new UnknownError(error);
  }
};

/**
 * Rank user by post count
 * @returns array of userId, postCount, ranking
 */
export const rankUserByPost = async (
  limit: number = 20,
  offset: number = 0,
) => {
  try {
    const user = await prisma.$queryRaw<RankUserType[]>`
    SELECT p."userId" ,COUNT(p.id) as postCount , RANK() OVER(
    ORDER BY COUNT(p.id) ASC) AS ranking
    FROM public.users u JOIN public.posts p ON p."userId" = u.id 
    GROUP BY p."userId"
    LIMIT  ${limit}
    OFFSET ${offset};
  `;
    return user;
  } catch (error) {
    throw new UnknownError(error);
  }
};

/**
 * get post by likeCount
 * @returns array of userId, postId, likeCount
 */
export const topPostByLike = async (limit: number = 20, offset: number = 0) => {
  try {
    const post = await prisma.$queryRaw<TopPostByLikes[]>`
      SELECT p."userId" AS createBy ,l."targetId" AS postId ,COUNT(l.id) AS likeCount
      FROM public.posts p JOIN public.likes l 
      ON p.id = l."targetId" 
      WHERE l."targetType" = 'post'
      GROUP BY l."targetId", p."userId"
      ORDER BY likeCount
      LIMIT  ${limit}
      OFFSET ${offset};
  `;
    return post;
  } catch (error) {
    throw new UnknownError(error);
  }
};


/**
 * get all user's last post
 * @returns array of username and postContext
 */
export const getAllUserLastPost = async () => {
  try {
    const result = await prisma.$queryRaw<UsernameAndPostName[]>`
      SELECT p."userId" AS createBy ,l."targetId" AS postId ,COUNT(l.id) AS likeCount
      FROM public.posts p JOIN public.likes l 
      ON p.id = l."targetId" 
      WHERE l."targetType" = 'post'
      GROUP BY l."targetId", p."userId"
      ORDER BY likeCount;
  `;
    return result;
  } catch (error) {
    throw new UnknownError(error);
  }
};
