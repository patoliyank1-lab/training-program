import Follow from "../models/followers.js";
import { followService } from "../service/followService.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { BadRequestError } from "../utils/error.js";
import { isFollowed } from "../utils/isFollowed.js";

/**
 * follow controller
 *  @description if user is following list then remove otherwise add in following. 
 */
export const followCtr = asyncHandler(async (req, res) => {
  const FollowingId = req.query.userId as string | undefined;
  const followerId = req.user?.userId;

  // check followerId and FollowingId is defined.
  if (!followerId) throw new BadRequestError("unauthorized person.");
  if (!FollowingId) throw new BadRequestError("Followers User id is not given");


  // check both user in database. 
  const followA = await Follow.findOne({ userId: followerId }).lean();
  if (!followA) throw new BadRequestError("follower User Id is not valid.");

  const followB = await Follow.findOne({ userId: FollowingId }).lean();
  if (!followB) throw new BadRequestError("following User Id is not valid.");

  // check if user is already follow or not. 
  const isFollowedUser = await isFollowed(followA.followingList, FollowingId);

  if (isFollowedUser) {
    // remove user from login user following list and follow user's follower list. 
    await followService.unFollow(followerId, FollowingId);
    res.status(200).json({
      success: true,
      status: 200,
      isFollowed: false,
      massage : 'this is user already follow this user so remove from follow list.',  
    });
  } else {
    // add user in login user following list and follow user's follower list. 
    await followService.Follow(followerId, FollowingId);
    res.status(200).json({
      success: true,
      status: 200,
      isFollowed: true,
      massage : 'this is user add in your followList.',  
    });
  }
});

/**
 * follower controller
 * @description this controller give then login user follower list.
 */
export const getFollowers = asyncHandler(async (req, res) => {
  const userId = req.user?.userId;
  if (!userId) throw new BadRequestError("This user not found.");

  // get follower list by user id
  const response = await followService.getFollowers(userId)

  res.status(200).json({
    success: true,
    status: 200,
    data: response,
  });
});

/**
 * following controller
 * @description this controller give then login user following list.
 */
export const getFollowing = asyncHandler(async (req, res) => {
  const userId = req.user?.userId;
  if (!userId) throw new BadRequestError("This user not found.");

  // get following list by user id.
  const response = await followService.getFollowing(userId)

  res.status(200).json({
    success: true,
    status: 200,
    data: response,
  });
});
