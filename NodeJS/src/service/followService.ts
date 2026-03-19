import Follow from "../models/followers.js";
import { BadRequestError } from "../utils/error.js";

export const followService = {
  Follow: async (followerId: string, FollowingId: string) => {
    try {
      await Follow.findOneAndUpdate(
        { userId: followerId },
        { $push: { followingList: FollowingId }, $inc: { following: 1 } },
      );

      await Follow.findOneAndUpdate(
        { userId: FollowingId },
        { $push: { followersList: followerId }, $inc: { followers: 1 } },
      );
    } catch (error) {
      throw new BadRequestError(error as string);
    }
  },

  unFollow: async (followerId: string, FollowingId: string) => {
    try {
      await Follow.findOneAndUpdate(
        { userId: followerId },
        { $pull: { followingList: FollowingId }, $inc: { following: -1 } },
      );

      await Follow.findOneAndUpdate(
        { userId: FollowingId },
        { $pull: { followersList: followerId }, $inc: { followers: -1 } },
      );
    } catch (error) {
      throw new BadRequestError(error as string);
    }
  },
  getFollowers: async (userId: string) => {
    console.log(userId);

    const userData = await Follow.findOne({ userId })
      .populate(
        "followersList",
        "-password -email -createdAt -updatedAt -__v -role -avatar -phone",
      )
      .lean();

    return {
      followers: userData?.followers,
      followersList: userData?.followersList,
    };
  },
  getFollowing: async (userId: string) => {
    const userData = await Follow.findOne({ userId })
      .populate(
        "followingList",
        "-password -email -createdAt -updatedAt -__v -role -avatar -phone",
      )
      .lean();

    return {
      followers: userData?.followers,
      followingList: userData?.followingList,
    };
  },
};
