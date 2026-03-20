import type { Types } from "mongoose";

/**
 * check if user is already following or not.
 * @param followingList Array of following userId.
 * @param userId userId which is want to check.
 * @returns is already following then true otherwise false.
 */
export const isFollowed = async (
  followingList: Types.ObjectId[],
  userId: string,
): Promise<boolean> => {
  const isHave = followingList.find(
    (value) => String(value) === String(userId),
  );

  if (isHave) {
    return true;
  }

  return false;
};
