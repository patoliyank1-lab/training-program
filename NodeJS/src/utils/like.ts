/**
 * function use to update like and dislike array.
 * @param Array Array of userId which is like then post
 * @param id new user id which want to like or dislike
 * @param add true for like and false for dislike
 * @returns updated array after like and dislike and count of like.
 */
export const likeFunction = (
  Array: string[],
  id: string,
  add: boolean = true,
) => {
  const LikeSet = new Set(Array);
  if (add) {
    LikeSet.add(id);
  } else {
    LikeSet.delete(id);
  }

  const likeArray = [...LikeSet];

  return { likeArray, length: likeArray.length };
};
