import Follow from "../models/followers.js";
import { followService } from "../service/followService.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { BadRequestError } from "../utils/error.js";
import { isFollowed } from "../utils/isFollowed.js";

export const followCtr = asyncHandler(async (req, res) => {
  const FollowingId = req.query.userId as string | undefined;
  const followerId = req.user?.userId;
  if (!followerId) throw new BadRequestError("unauthorized person.");
  if (!FollowingId) throw new BadRequestError("Followers User id is not given");

  const followA = await Follow.findOne({ userId: followerId }).lean();
  if (!followA) throw new BadRequestError("follower User Id is not valid.");

  const followB = await Follow.findOne({ userId: FollowingId }).lean();
  if (!followB) throw new BadRequestError("following User Id is not valid.");

  const isFollowedUser = await isFollowed(followA.followingList, FollowingId);

  if (isFollowedUser) {
    await followService.unFollow(followerId, FollowingId);
    res.status(200).json({
      success: true,
      status: 200,
      isFollowed: false,
      massage : 'this is user already follow this user so remove from follow list.',  
    });
  } else {
    await followService.Follow(followerId, FollowingId);
    res.status(200).json({
      success: true,
      status: 200,
      isFollowed: true,
      massage : 'this is user add in your followList.',  
    });
  }
});

export const getFollowers = asyncHandler(async (req, res) => {
  const userId = req.user?.userId;
  if (!userId) throw new BadRequestError("This user not found.");

  const response = await followService.getFollowers(userId)

  res.status(200).json({
    success: true,
    status: 200,
    data: response,
  });
});

export const getFollowing = asyncHandler(async (req, res) => {
  const userId = req.user?.userId;
  if (!userId) throw new BadRequestError("This user not found.");

  const response = await followService.getFollowing(userId)

  res.status(200).json({
    success: true,
    status: 200,
    data: response,
  });
});
