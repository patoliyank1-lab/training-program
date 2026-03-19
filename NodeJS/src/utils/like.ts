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
