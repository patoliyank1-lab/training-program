import Follow from "../models/followers.js";
import { BadRequestError } from "../utils/error.js";

export const followService = {
  /**
   * update both user's follower and following list.
   * @param followerId login user Id.
   * @param FollowingId user id which user want to follow.
   */
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

  /**
   * update both user's follower and following list.
   * @param followerId login user Id.
   * @param FollowingId user id which user want to unfollow.
   */
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

  /**
   * use to get user's follower number and list.
   * @param userId userId which user's follower list want
   * @returns follower user count and following user list.
   */
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

  /**
   * use to get user's following number and list.
   * @param userId userId which user's following list want
   * @returns following user count and following user list.
   */
  getFollowing: async (userId: string) => {
    const userData = await Follow.findOne({ userId })
      .populate(
        "followingList",
        "-password -email -createdAt -updatedAt -__v -role -avatar -phone",
      )
      .lean();

    return {
      following: userData?.following,
      followingList: userData?.followingList,
    };
  },
};
