import type { Types } from "mongoose";

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
